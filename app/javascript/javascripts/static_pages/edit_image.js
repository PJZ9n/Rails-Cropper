import Cropper from "cropperjs";
import {Modal} from "bootstrap";

let cropper;

//windowに定義することで、html側から呼び出せる
window.selectIcon = function (fileInputElement) {
    if (cropper) {
        //Cropperが既に初期化されていたら削除する(通常はmodalを閉じて2回目以降の場合)
        cropper.destroy();
    }

    //modal出す
    let modal = new Modal(document.getElementById("crop-modal"));
    modal.show();

    //表示する
    let image = document.getElementById("crop-image");
    let fileReader = new FileReader();
    fileReader.onload = function () {
        image.src = fileReader.result;

        //ここでimgタグに画像が表示された

        window.addEventListener("shown.bs.modal", function () {
            //modalのフェードなどが停止し完全に表示された時(そうでないとCropperのレンダリングがうまくいかない)

            //Cropper初期化
            cropper = new Cropper(image, {
                aspectRatio: 1,//1:1(正方形)
            });
        }, {once: true});
    };
    fileReader.readAsDataURL(fileInputElement.files[0]);

    //file inputを初期化しておく
    fileInputElement.value = "";
};

window.resetCrop = function () {
    if (cropper) {//cropperが初期化されているか？
        cropper.reset();
    }
};

window.saveCrop = function () {
    if (cropper) {//cropperが初期化されているか？
        //クロップされたキャンバス(HTMLCanvasElement)を取得
        let croppedCanvas = cropper.getCroppedCanvas();

        //結果表示する
        let resultBox = document.getElementById("result-box");
        resultBox.innerHTML = '<img src="' + croppedCanvas.toDataURL() + '">';

        //モーダルを閉じる
        let modal = Modal.getInstance(document.getElementById("crop-modal"));
        modal.hide();
    }
};
