const Media = require('../models/media');
const multer = require('multer');
const s3 = require('../config/aws');
const uuid = require('uuid').v4;

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('media');

exports.uploadMedia = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(422).send({ error: err.message });

        const file = req.file;
        console.log('The file is ', file)
        const key = `${uuid()}-${file.originalname}`;
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: file.buffer,
        };

        s3.upload(params, async (err, data) => {
            if (err) return res.status(422).send({ error: err.message });

            const media = new Media({ url: data.Location, user: req.user._id });
            await media.save();
            res.send(media);
        });
    });
};

exports.getMedia = async (req, res) => {
    const media = await Media.find({ user: req.user._id });
    res.send(media);
};

exports.deleteMedia = async (req, res) => {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) return res.status(404).send({ error: 'Media not found' });

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: media.url.split('/').pop(),
    };

    s3.deleteObject(params, async (err) => {
        if (err) return res.status(422).send({ error: err.message });

        await media.deleteOne()

        res.send({ success: true });
    });
};
