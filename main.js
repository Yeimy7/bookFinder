'use strict'
window.addEventListener('load', () => {
    const search = document.getElementById('search');
    const books=document.getElementById('book');

    search.addEventListener('click', searchB);
    books.addEventListener('keypress',(e)=>{
        if(e.which==13)
            searchB(e)
    })
  
    function searchB(){
        let book = books.value;
        if (book) {
            searchBook(book);
        } else {
            alert('Introduzca el nombre de un libro, autor, ...')
        }
    }
    function searchBook(bookTerm) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTerm}&maxResults=12`)
            .then(result => {
                return result.json();
            })
            .then(result => {
                init(result.items);
            })
    }
    function init(resultFromServer) {
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = "";
        searchResult.style.display = 'flex';

        resultFromServer.forEach(element => {
            let title = element.volumeInfo.title;
            let autor = element.volumeInfo.authors;
            let date = element.volumeInfo.publishedDate;
            let pub = element.volumeInfo.publisher;
            let img;
            if(element.volumeInfo.imageLinks==undefined){
                img='https://images-na.ssl-images-amazon.com/images/I/417efBUAHCL._SX317_BO1,204,203,200_.jpg'
            }else{
                img=element.volumeInfo.imageLinks.thumbnail;
            }
            let link = element.volumeInfo.previewLink;

            let newBook = makeBook(title, autor, date, pub, img, link);
            searchResult.appendChild(newBook);
        });
    }
    function makeBook(title, autor, date, pub, img, link) {
        let container = document.createElement('div');
        let imagen = document.createElement('img');
        imagen.setAttribute('src',img);
        let figure = document.createElement('figure');
        figure.appendChild(imagen);
        let content = document.createElement('div');
        let alink=document.createElement('a');
        alink.innerHTML='More';
        alink.setAttribute('href',link);
        alink.setAttribute('target','_link');

        let stitulo = document.createElement('strong');
        stitulo.innerHTML = title;
        let sautor = document.createElement('strong');
        sautor.innerHTML='Authors: ';
        let sdate = document.createElement('strong');
        sdate.innerHTML='Published Date: ';
        let spub = document.createElement('strong');
        spub.innerHTML='Publisher: ';

        let spautor = document.createElement('span');
        if(autor)
            spautor.innerHTML=autor.toString();
        let spdate = document.createElement('span');
        spdate.innerHTML=date;
        let sppub = document.createElement('span');
        sppub.innerHTML=pub;

        let ptitulo = document.createElement('p');
        ptitulo.appendChild(stitulo);
        let pautor = document.createElement('p');
        pautor.appendChild(sautor);
        pautor.appendChild(spautor);
        let pdate = document.createElement('p');
        pdate.appendChild(sdate);
        pdate.appendChild(spdate);
        let ppub = document.createElement('p');
        ppub.appendChild(spub);
        ppub.appendChild(sppub);

        content.appendChild(ptitulo);
        content.appendChild(pautor);
        content.appendChild(pdate);
        content.appendChild(ppub);
        content.appendChild(alink);

        container.classList.add('search-item');
        container.appendChild(figure);
        container.appendChild(content);

        return container;
    }

})