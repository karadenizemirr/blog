import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AboutPage(){
    return (
        <div className="grid grid-cols-12 w-full min-h-[70vh] container mx-auto mt-20">
            <div className="col-span-12 lg:col-span-6 flex flex-1 items-center justify-center">
                <Image src="https://res.cloudinary.com/dssep9ze1/image/upload/f_auto,q_auto/v1/brkshn/dbv6whn9lrexxpnbmvdz" width={600} height={600} alt="banner" />
            </div>
            <div className="col-span-12 lg:col-span-6 text-center flex flex-1 justify-center items-center">
                <div className="title">
                    <h1 className="text-2xl font-bold mt-5 mb-5" >
                        Hoş Geldiniz
                    </h1>
                    <p>
                        BlogPaylaş.com, kişisel ve profesyonel deneyimlerinizi, düşüncelerinizi ve hikayelerinizi paylaşabileceğiniz, dinamik ve kullanıcı dostu bir blog platformudur. BlogPaylaş.com, yazarlar, düşünürler ve hikaye anlatıcıları için bir araç sunar. Ücretsiz bir üye hesabı oluşturarak, dünyayla paylaşmak istediğiniz her şeyi yazabilir, fotoğraf ekleyebilir, ve okuyucularınızla etkileşimde bulunabilirsiniz.
                    </p>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <span className="font-bold">Ücretsiz Üyelik:</span>BlogPaylaş.com'a katılmak tamamen ücretsizdir. Hemen bir hesap oluşturun ve yazmaya başlayın.
                        </li>
                        <li>
                            <span className="font-bold">Kullanıcı Dostu Arayüz:</span>Blog yazma işlemini kolaylaştıran, sezgisel bir arayüzle karşılaşacaksınız.
                        </li>
                        <li>
                            <span className="font-bold" >Çeşitli Kategoriler:</span>Moda, seyahat, teknoloji, sağlık, eğitim ve çok daha fazlası. İlgi alanınıza uygun bir kategori seçin.
                        </li>
                        <li>
                            <span className="font-bold">Yorumlar ve Geribildirim:</span>Okuyucularınızın yazılarınıza yorum yapmasına ve geri bildirim vermesine izin vererek toplulukla etkileşimde bulunun.
                        </li>
                    </ul>
                    <p className="mt-2" >
                    Üyelik başvurusu yapmak ve yazmaya başlamak için <Link className="text-blue-500" href="/register" >şimdi kaydolun</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}