const Document = require("../models/document");
const { Router } = require("express"); // import router from express
const multer = require("multer");
const router = Router();
const upload = multer({ dest: "uploads/" });

//Add Document
router.post("/add", upload.single("file"), async (req, res, next) => {
 try{
            const file = req.file;
            const formData = req.body;

            const { access,user } = formData;

            //Validation
            if(!access || !user) {
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
        catch(err){
            next(err);
        }
    });


module.exports = router;