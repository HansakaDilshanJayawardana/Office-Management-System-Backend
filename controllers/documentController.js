const Document = require("../models/document");
const { Router } = require("express"); // import router from express
const multer = require("multer");
const router = Router();
const upload = multer({ dest: "uploads/" });

//Add Document
router.post("/add", upload.single("file"), async (req, res, next) => {
    try {
        const file = req.file;
        const formData = req.body;

        const { access, user } = formData;

        //Validation
        if (!access || !user) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        //check if document already exists

        //create document
        const newDocument = new Document({
            title: file.originalname,
            url: file.path,
            type: file.mimetype,
            size: file.size,
            access,
            user
        });

        //save document
        await newDocument.save();

        if (newDocument) {
            res.status(201).json({
                success: true,
                data: newDocument,
                message: 'Document added'
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Document not added'
            });
            throw new Error('Document not added');
        }


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

    //get all documents shared with the user
    const sharedDocuments = await Document.find({ access: "shared" });

    //combine all documents
    const allDocuments = [...documents, ...publicDocuments, ...sharedDocuments];

    if (allDocuments) {
        res.status(200).json({
            success: true,
            data: allDocuments
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
        throw new Error('Document not found');
    }
});






module.exports = router;