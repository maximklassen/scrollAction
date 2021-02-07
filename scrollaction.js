function isVisible (elem,callbackTrue='',callbackFalse='',isFull=0.5,timeout=0) {
    if (typeof elem == 'string') {
        elem = document.querySelector(elem);
    }
    if (elem === null || typeof elem != 'object') {
        return false;
    }
    let elemBCR = elem.getBoundingClientRect();
    let position = {
        elem: {
            top: window.pageYOffset + elemBCR.top,
            left: window.pageXOffset + elemBCR.left,
            right: window.pageXOffset + elemBCR.right,
            bottom: window.pageYOffset + elemBCR.bottom,
        },
        window: {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        }
    };
    if (position.elem.bottom > position.window.top && position.elem.top < position.window.bottom && position.elem.right > position.window.left && position.elem.left < position.window.right) {
            
        let topDiff = position.elem.top - position.window.top;
        let bottomDiff = position.window.bottom - position.elem.bottom;
        let leftDiff = position.elem.left - position.window.left;
        let rightDiff = position.window.right - position.elem.right;
        let visibleHeight = elemBCR.height;
        let visibleWidth = elemBCR.width;
        if (topDiff<0) {
            visibleHeight += topDiff;
        }
        if (bottomDiff<0) {
            visibleHeight += bottomDiff;
        }
        if (leftDiff<0) {
            visibleWidth += leftDiff;
        }
        if (rightDiff<0) {
            visibleWidth += rightDiff;
        }
        let percent = (visibleWidth * visibleHeight) / (elemBCR.width * elemBCR.height);
        
        if (parseFloat(isFull)<=percent) {
            if (parseInt(timeout)>0) {
                setTimeout (callbackTrue,timeout);
            }
            else {
                callbackTrue();
            }
        }
        else {
            callbackFalse();
        }
    }
    else {
        callbackFalse();
    }
}
function whatVisible (elem) {
    if (typeof elem == 'string') {
        elem = document.querySelector(elem);
    }
    if (elem === null || typeof elem != 'object') {
        return false;
    }
    let elemBCR = elem.getBoundingClientRect();
    let position = {
        elem: {
            top: window.pageYOffset + elemBCR.top,
            left: window.pageXOffset + elemBCR.left,
            right: window.pageXOffset + elemBCR.right,
            bottom: window.pageYOffset + elemBCR.bottom,
        },
        window: {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        }
    };
    if (position.elem.bottom > position.window.top && position.elem.top < position.window.bottom && position.elem.right > position.window.left && position.elem.left < position.window.right) {
            
        let topDiff = position.elem.top - position.window.top;
        let bottomDiff = position.window.bottom - position.elem.bottom;
        let leftDiff = position.elem.left - position.window.left;
        let rightDiff = position.window.right - position.elem.right;
        let visibleHeight = elemBCR.height;
        let visibleWidth = elemBCR.width;
        if (topDiff<0) {
            visibleHeight += topDiff;
        }
        if (bottomDiff<0) {
            visibleHeight += bottomDiff;
        }
        if (leftDiff<0) {
            visibleWidth += leftDiff;
        }
        if (rightDiff<0) {
            visibleWidth += rightDiff;
        }
        let percent = (visibleWidth * visibleHeight) / (elemBCR.width * elemBCR.height);
        return percent;
    }
    else {
        return 0;
    }
}

function setIsVisible (object,fill=.5,timeout=0,callbackTrue='',callbackFalse='') {

    let objectType = typeof object;

    if (objectType === 'string') {
        object = document.querySelectorAll('.color-box');
    }
    else if (objectType !== 'object') {
        console.warn('Can not get element');
        return false;
    }

    try {
        object.forEach(function(elem){
            isVisible (elem,function(){
                elem.classList.remove('invisible');
                callbackTrue;
            },function(){
                elem.classList.add('invisible');
                callbackFalse;
            },
            fill,
            timeout);
        });
    }
    catch (e) {
        console.warn('JavaScript returned error: ' + e);
    }

}