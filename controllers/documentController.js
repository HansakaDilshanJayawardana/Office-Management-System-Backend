const Document = require("../models/document");
const { Router } = require("express"); // import router from express
const router = Router();

//Add Document
router.post("/add", async (req, res, next) => {
    try {

        //create document
        const document = new Document({
            title: req.body.title,
            url: req.body.url,
            size: req.body.size,
            access: req.body.access,
            user: req.body.user,
            createdAt: Date.now(),
            type: req.body.type
        });

        //save document
        await document.save();
        return res.status(201).json({
            success: true,
            data: document,
            message: 'Document added'
        });



    }
    catch (err) {
        next(err);
    }
});

//Retrieve all the documents for a user with public and shared documents
router.get("/get/:id", async (req, res) => {

    //get all documents for the user
    const documents = await Document.find({ user: req.params.id });

    //get all documents public and shared
    const publicDocuments = await Document.find({ access: "public" });

    //combine all documents
    const allDocuments = [...documents, ...publicDocuments];

    //remove duplicates
    const uniqueDocuments = [...new Set(allDocuments.map(item => item.title))].map(title => {
        return allDocuments.find(item => item.title === title)
    })

    if (allDocuments) {
        res.status(200).json({
            success: true,
            data: uniqueDocuments,
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Documents not found'
        });
        throw new Error('Documents not found');
    }
});

//edit document
router.put("/edit/:id", async (req, res) => {
    const { access } = req.body;

    //Validation
    if (!access) {
        return res.status(400).json({
            success: false,
            message: 'Please enter access fields'
        });
    }

    //check if document exists
    const document = await Document.findById(req.params.id);

    //if document exists
    if (document) {
        document.access = access;
        document.updatedAt = Date.now();
        await document.save();
        res.status(200).json({
            success: true,
            data: document,
            message: 'Document updated'
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Document not found'
        });
        throw new Error('Document not found');
    }
});

//download document
router.get("/download/:id", async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (document) {
        res.status(200).json({
            success: true,
            data: document
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Document not found'
        });
        throw new Error('Document not found');
    }
});

//delete document
router.delete("/delete/:id", async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (document) {
        //remove document using mongoose
        await document.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Document deleted'
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Document not found'
        });

    }
});


module.exports = router;