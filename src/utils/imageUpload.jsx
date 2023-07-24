import { cloudName, uploadPreset } from "../config/config"

export const checkImage = (file) => {
    let err = ""
    if (!file) {
        return err = "File does not exist."
    }

    if (file.size > 1024 * 1024) // 1mb
    {
        err = "The largest image size is 1mb"
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        err = "Image format is incorrect"
    }

    return err
}


export const fileUpload = async (images) => {
    console.log("fileupload");
    const uploadOptions = {
        cloudName,
        uploadPreset,
        folder: 'profile-photos',
        resourceType: 'image',
        multiple: false,
        cropping: false,
        public_id: 'my-profile-photo',
        tags: ['profile-photo']
    };

    console.log('window.cloudinary', window.cloudinary);
    window.cloudinary.openUploadWidget(uploadOptions, (error, result) => {
        if (error) {
            console.log(error);
        }
        if (result && result.event === 'success') {
            console.log(result.info); // Cloudinary response object
        }
    });
}

export const imageUpload = async (images) => {
    console.log("image upload", images);
    let imgArr = [];

    for (const item of images) {
        const formData = new FormData()

        if (item.camera) {
            formData.append("file", item.camera)
        }
        else {
            formData.append("file", item)
        }

        formData.append("upload_preset", "") 
        const res = await fetch("", {
            method: "POST",
            body: formData
        })

        console.log("response cloudinary", res);
        const data = await res.json()
        imgArr.push({ public_id: data.public_id, url: data.url })
    }
    console.log("image arr", imgArr);
    return imgArr;
}
