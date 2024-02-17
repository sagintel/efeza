let sign_in_btn = document.querySelector("#sign-in-btn");
let sign_up_btn = document.querySelector("#sign-up-btn");
let container = document.querySelector(".container");
let file = document.querySelector('#file');
let fileOpen = document.querySelector('#photoView');
let imgView = document.querySelector('#imgView');
let imgTxt = document.querySelector('#chose');
let cardImg = document.querySelector('#card_img');
let cardName = document.querySelector('#card_name');
let cardCode = document.querySelector('#card_code');
let cardNumber = document.querySelector('#cardNumber');
let fName = document.querySelector('#fName');
let lName = document.querySelector('#lName');
let aCode = document.querySelector('#aCode');
let numb = document.querySelector('#phone');
let Badge = document.querySelector('#badge');
let btnImage = document.querySelector('#btnImage');
let btnPDF = document.querySelector('#btnPDF');
let fileName = '';
let imgSrc;

// let a4Width = 210mm;
// let a4Height = 297mm;


fileOpen.addEventListener('click', () => {
    file.click();
})

file.addEventListener("change", () => {
    fileName = file.files[0];
    imgSrc = URL.createObjectURL(fileName);
    imgView.src = imgSrc;
    cardImg.src = imgSrc;
    imgView.style.display = 'block';
    imgTxt.style.display = 'none';
})

function showSnackbar (){
	var snackbar = document.getElementById("snackbar");

	snackbar.classList.add("show")

	setTimeout(()=>{
		snackbar.classList.remove("show")
	},5000)
}

// sign_in_btn.addEventListener("click", () => {

//   container.classList.remove("sign-up-mode");
//   container.classList.add("sign-in-mode");

// });

btnImage.addEventListener("click",()=>{

	btnImage.innerHTML = "processing";

    domtoimage.toPng(badge,{ quality: 1}).then((data)=>{
       var img = new Image();
          img.src = data;

        var link =document.createElement("a");
        link.download= "badgeImage.png";
        link.href=data;
        link.click();
    });

	showSnackbar()
    btnImage.innerHTML = "download Image"; 
})

btnPDF.addEventListener("click",()=>{

  btnPDF.innerHTML = "processing";

        const { jsPDF } = window.jspdf;
	const image = new Image();
	
	domtoimage.toPng(badge,{ quality: 1}).then((data)=>{
           var newImg = new Image();
            newImg.src = data;
            var link =document.createElement("a");
            image.src=data;
             const doc = new jsPDF('p', 'px','a6');
	    const pageWidth = doc.internal.pageSize.getWidth();
	    const pageHeight = doc.internal.pageSize.getHeight();
	
	    const widthRatio = pageWidth / image.width;
	    const heightRatio = pageHeight / image.height;
	    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
	
	    const canvasWidth = image.width * ratio;
	    const canvasHeight = image.height * ratio;

    	doc.addImage(image, 'PNG', 25, 15, image.width, image.height);
        doc.save("badgePDF.pdf");
});
  // const image = new Image();

  // domtoimage.toPng(badge,{ quality: 1}).then((data)=>{
  //       var link =document.createElement("a");
  //       link.download= "imageBadge.png";
  //       link.href=data;
  //       image.src=data;

  // const {jsPDF}= window.jspdf;
  // const doc=new jsPDF('p','px','a4');
  // const x=(doc.internal.pageSize.width)/6;
  
  // doc.addImage(image,"png",x,15);
  // doc.save(code.value+".pdf");

    //   image.onload = function () {
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');

    //     // Set canvas dimensions to A4 size at 150dpi
    //     const a4Width = 8.27 * 150;
    //     const a4Height = 11.69 * 150;
    //     canvas.width = a4Width;
    //     canvas.height = a4Height;

    //     // Calculate scaling to fit the image within A4 dimensions
    //     const scale = Math.min(a4Width / image.width, a4Height / image.height);
    //     const newWidth = image.width * scale;
    //     const newHeight = image.height * scale;

    //     // Draw the image on the canvas
    //     context.drawImage(image, 0, 0, newWidth, newHeight);

    //     // Generate PDF
    //     html2pdf(canvas, {
    //       margin: 10,
    //       filename: 'badge.pdf',
    //       jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' },
    //       image: { type: 'jpeg', quality: 1 },
    //     }).then(() => {
    //       URL.revokeObjectURL(imageUrl); // Clean up object URL
    //       console.log('downloaded')
    //     });
    //   };

		
    // })
  showSnackbar()
  btnPDF.innerHTML = "download PDF"; 
})

sign_up_btn.addEventListener("click", () => {

    if (fileName !== '') {

    	sign_up_btn.innerHTML = "processing";
    	card_name.innerHTML = `${fName.value} ${lName.value}`;
    	cardCode.innerHTML = aCode.value;
    	cardNumber.innerHTML = numb.value;

    	if (aCode.value.length == 5 ) {

	    	setTimeout(()=>{
		    	container.classList.remove("sign-in-mode");
		    	container.classList.add("sign-up-mode");
	    	},3000)

	    sign_up_btn.innerHTML = "generate";

    	} else {
    		alert('Agent code must be 5 numbers');

    	}

    } else {
        alert('please, select an image');
    }
});
