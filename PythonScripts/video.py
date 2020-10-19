import cv2


def create_capture(source=0):
    # Camera.set(cv2::CAP_PROP_FORMAT, CV_32F)
    source = str(source).strip()
    chunks = source.split(':')

    if len(chunks) > 1 and len(chunks[0]) == 1 and chunks[0].isalpha():
        chunks[1] = chunks[0] + ':' + chunks[1]
        del chunks[0]

    source = int(chunks[0])
    return cv2.VideoCapture(source)