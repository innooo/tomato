// 获取文件上传控件
let imgForm = document.getElementById('file');
// 创建表单数据实例
let myFormData = new FormData();
function loadImg() {
    // 获取文件
    let imgData = imgForm.files[0];
    // 向表单对象中添加数据
    myFormData.append('image',imgData);
    // console.log(myFormData.getAll('image'));
    // 创建fileReader对象
    let reader = new FileReader();
    reader.readAsDataURL(imgData);
    reader.onload = function(e) {
        imgSource = e.target.result;
        // console.log(e.target.result);
        // 获取img元素
        // let img = document.getElementById('img');
        // img.src = e.target.result;
        let img = new Image(); // 创建image对象
        img.src = imgSource;
        // 图片加载成功后绘制canvas
        img.onload = function() {
            let theCanvas = document.getElementById('imgCanvas');
            let canvasImg = theCanvas.getContext('2d') // 获取2d上下文
            canvasImg.drawImage(img, 0, 0);
            // 在图片选择区添加事件实现图片的选择
            let L, T; // 鼠标起点位置
            let startX, startY, endX, endY; // 图片选择区域坐标
            const W = theCanvas.width; // 图片选择区画布宽高
            const H = theCanvas.height;
            let flag = false; // 用于判断是否处于选择状态
            let isSelect = false; // 用于表示有没有进行选择
            // 预览区画布
            let previewCanvas = document.getElementById('previewCanvas');
            let previewContext = previewCanvas.getContext('2d');
            const preW = previewCanvas.width; //预览区画布宽高
            const preH = previewCanvas.height;
            let resultFile; // 截取的图片转化而来的blob数据
            
           // 将图片预览区域的内容转化为blob数据
           function toBolb() {
                previewCanvas.toBlob(blob => {
                    resultFile = blob;
                });
            }
            function showImgMove (e) {
                // 记录实时鼠标位置相对于最初位置的偏移量
                let offsetX = e.layerX - L;
                let offsetY = e.layerY - T;
                // 更新选择区域起点终点坐标
                startX += offsetX;
                startY += offsetY;
                endX += offsetX;
                endY += offsetY;
                if(flag) {
                    // 记录当前选择区域的宽高
                    if(endX - startX !== 0 && endY - startY !== 0 ) {
                        isSelect = true;
                        canvasImg.clearRect(0, 0, W, H); // 清空整个画布
                        canvasImg.drawImage(img, 0, 0); // 绘制选择的图片
                        // 绘制蒙版
                        drawMask(startX, startY, endX, endY);
                        // 绘制图片预览区域
                        drawPreviewImg(startX, startY, endX, endY);
                    }else {
                        isSelect = false;
                    }
                }
                L = e.layerX;
                T = e.layerY;
            }
            // 鼠标移动事件函数(图片选择)
            function showImgCut(e) {
                // 如果当前处于选择状态
                if(flag) {
                    // 记录当前绘制终点
                    endX = e.layerX - startX <= preW ? e.layerX : startX + preW;
                    endY = e.layerY - startY <= preH ? e.layerY : startY + preH;
                    if(e.layerX - startX !== 0 && e.layerY - startY !== 0 ) {
                        isSelect = true;
                        canvasImg.clearRect(0, 0, W, H); // 清空整个画布
                        canvasImg.drawImage(img, 0, 0); // 绘制选择的图片
                        // 绘制蒙版
                        drawMask(startX, startY, endX, endY);
                        // 绘制图片预览区域
                        drawPreviewImg(startX, startY, endX, endY);
                    }else {
                        isSelect = false;
                    }
                }
            }
            // 绘制蒙版方法
            function drawMask(startX, startY, endX, endY) {
                // 绘制四块矩形拼接成蒙版
                canvasImg.fillStyle = 'rgba(255,255,255,0.5)';
                canvasImg.fillRect(0, 0, endX, startY);
                canvasImg.fillRect(endX, 0, W, endY);
                canvasImg.fillRect(startX, endY, W, H);
                canvasImg.fillRect(0, startY, startX, H);
            }
            // 在画布中移动选择图片的位置
            function moveCutImg(e) {
                // 在选择的图片内部 此时点击这里移动选择框
                document.addEventListener('mousemove', showImgMove); // 绑定鼠标移动事件
                document.addEventListener('mouseup', function() {
                    document.removeEventListener('mousemove', showImgMove); // 移除鼠标移动事件
                    if(flag && isSelect) {
                        // 将图片预览区域的内容转化为blob数据
                        toBolb();
                    }
                    flag = false;
                    isSelect = false;
                })
            }
            // 画布中选择图片区域
            function doCutImg(e) {
                // 记录选择图片起点位置
                startX = e.layerX;
                startY = e.layerY;
                // 绑定鼠标移动事件
                document.addEventListener('mousemove', showImgCut);
                // 鼠标抬起
                document.addEventListener('mouseup', function() {
                    document.removeEventListener('mousemove', showImgCut); // 移除鼠标移动事件
                    if(flag && isSelect) {
                        // 将图片预览区域的内容转化为blob数据
                        toBolb();
                    }
                    flag = false;
                    isSelect = false;
                })
            }

            // 预览区绘制图片
            function drawPreviewImg(startX, startY, endX, endY) {
                 // 绘制图片预览区域
                let cutImg = canvasImg.getImageData(startX, startY, endX, endY); // 截取的图片区域
                previewContext.clearRect(0, 0, preW, preH) // 清空预览区画布
                previewContext.putImageData(cutImg, 0, 0)
            }
            theCanvas.addEventListener('mousedown', function(e) {
                flag = true;
                // 记录鼠标起点位置
                L = e.layerX;
                T = e.layerY;
                // 判断当前鼠标位置是否在之前选择的图片区域内
                if(startX && startY && endX && endY && e.layerX > startX && e.layerX < endX && e.layerY > startY && e.layerY < endY ) {
                    // 移动画布中选择图片的位置
                    moveCutImg(e);
                }else {
                    doCutImg(e);
                }
            });
        }
    }
}
imgForm.onchange = loadImg;
