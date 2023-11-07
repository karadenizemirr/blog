export const calculateReadingTime = (text:string) => {
    try{
        const words = text.split(' ').length
        const minutes = Math.ceil(words / 200)

        return 'Okuma Süresi Ortalama:' + String(minutes) +' '+ 'Dakika'
    }catch(err){
        return null
    }
}