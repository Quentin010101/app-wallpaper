import { CameraResultType, CameraSource, ImageOptions } from "@capacitor/camera";

export const options = {

    imageOptions: {
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64, 
        source: CameraSource.Photos,
        width: 70,
        promptLabelHeader: 'Text test',
        promptLabelCancel: 'Text test2',
        promptLabelPhoto: 'Text test 3',
        promptLabelPicture: 'Text test 4'
      }
}