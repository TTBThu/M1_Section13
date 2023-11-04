//khi sự kiện "DOMContentLoaded" xảy ra, hàm (function) được truyền vào sẽ được thực thi
document.addEventListener("DOMContentLoaded", function() {
    //tìm và chọn phần tử có tên class giống vậy
    const mainImage = document.querySelector('.main-image img');
    const thumbnailList = document.querySelector('.thumbnail-list');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg'];
    let currentIndex = 0;

    // Hàm để cập nhật ảnh hiển thị
    function updateImage(index) {
        //lấy phần tử index trong mảng images đã khai báo ở trên và gán vào đường dẫn src của biến mainImage
        mainImage.src = images[index];
    }

    // Hàm để cập nhật danh sách thumbnail
    function updateThumbnailList(startIndex) {
        //innerHTML có tác dụng đọc và ghi HTML và văn bản bên trong phần tử một cách động
        //gán giá trị rỗng '' vào tất cả phần tử có tên thumbnailList
        thumbnailList.innerHTML = '';

        for (let i = startIndex; i < startIndex + 5; i++) {
            if (i >= images.length) {
                break;
            }

            //tạo phần tử mới có thuộc tính là img. Có thể tạo: "div", "p", "a",...
            const img = document.createElement('img');
            img.src = images[i];
            img.alt = `Image ${i + 1}`;
            //element.addEventListener(event, listener [, options]);
            //event: Tên của sự kiện mà bạn muốn lắng nghe, ví dụ "click", "mouseover", "keydown", "DOMContentLoaded",...
            //listener: Một hàm (function) JavaScript sẽ được gọi khi sự kiện xảy ra
            //options (tùy chọn, không bắt buộc)
            img.addEventListener('click', () => {
                updateImage(i);
            });

            //parentElement.appendChild(childElement);
            //thêm một phần tử con (child element) vào một phần tử cha (parent element)
            thumbnailList.appendChild(img);
        }
        //parentElement.insertBefore(newElement, referenceElement);
        //chèn một phần tử con vào một phần tử cha, trước một phần tử con đã tồn tại trong phần tử cha
        //cho phép điều khiển cụ thể vị trí chèn của phần tử con
    }

    // Sự kiện click nút next
    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateThumbnailList(currentIndex);
        }
    });

    // Sự kiện click nút prev
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateThumbnailList(currentIndex);
        }
    });

    // Tự động đổi ảnh sau 30 giây
    //thiết lập một khoảng thời gian lặp lại, nhận 2 đối số
    setInterval(() => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateImage(currentIndex);
    //setInterval(callback, delay, [arg1, arg2, ...]);
    //callback là một hàm hoặc một đoạn mã được thực hiện sau mỗi khoảng thời gian delay
    //delay là thời gian trong miligiây giữa các lần thực hiện của callback
    //arg1, arg2, ... (tùy chọn): Các đối số bổ sung muốn truyền cho callback khi nó được gọi
    }, 30000);

    // Khởi đầu bằng việc cập nhật ảnh và danh sách thumbnail
    updateImage(currentIndex);
    updateThumbnailList(currentIndex);
});
