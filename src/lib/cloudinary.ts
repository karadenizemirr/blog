const cloudinaryUploadSingle = async (file:any) => {
    try{
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'brkshn')
        
        try{
            const upload_res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method:'POST',
                body:formData,
            })
            
            const res = await upload_res.json()
            return res?.url

        }catch(err){
            return false
        }

    }catch(err){
        return false
    }
}

export default cloudinaryUploadSingle