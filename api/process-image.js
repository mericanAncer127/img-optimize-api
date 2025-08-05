
import sharp from 'sharp';

export default async function handler(req, res) {

    // if the request is GET
    if (req.method === 'GET') {
        const { url } = req.query;

        if (!url) {
            res.status(400).json({ msg: "No image provided" });
        }

        try {

            //fetch the image with the url
            const imageBuffer = await fetch(url).then(res => res.bffer());

            //optimize
            const optimizedImage = await sharp(imageBuffer)
                .resize(200)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toBuffer();

            //return optimized image

            res.setHeader('Content-Type', 'image/jpeg');
            res.status(200).send(optimizedImage);

        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: `Error ${e} occured while processing images` });
        }
    }
}