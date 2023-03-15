const Document = require("../models/document");
const { Router } = require("express"); // import router from express
const multer = require("multer");
const router = Router();
const upload = multer({ dest: "uploads/" });

//Add Document
router.post("/add", async (req, res) => {
    upload.single("file"), async (req, res, next) => {
        if(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }else{
            const file = req.file;
            const formData = req.body;

            const { title, type, size,access,user } = formData;

            //Validation
            if(!title || !description) {
                return res.status(400).json({
                    success: false,
                    message: 'Please enter all fields'
                });
            }

            //check if document already exists

            //create document
            const newDocument = new Document({
                title,
                url: file.path,
                type,
                size,
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
    }
});


module.exports = router;