// Lista słów
let slowa = ['dom', 'szkoła', 'komputer', 'książka', 'rower', 'samochód', 'pies', 'kot', 'stół', 'krzesło'];
let zaliczoneSlowa = [];
let aktualneSlowo = '';
let czasWyswietlania = 100; // Domyślny czas wyświetlania 100 ms

// Funkcja losująca słowo
function losujSlowo() {
    if (slowa.length === 0) {
        document.getElementById('word').textContent = 'Brak słów do losowania!';
        return;
    }
    
    const index = Math.floor(Math.random() * slowa.length);
    aktualneSlowo = slowa[index];
    
    // Wyświetlanie słowa na określoną ilość czasu (ustawioną przez suwak)
    document.getElementById('word').textContent = aktualneSlowo;
    setTimeout(() => {
        document.getElementById('word').textContent = '';
    }, czasWyswietlania);

    // Aktywowanie przycisków "dobrze" i "źle"
    document.getElementById('dobrze').disabled = false;
    document.getElementById('zle').disabled = false;
}

// Funkcja obsługująca kliknięcie "dobrze"
function dobrze() {
    // Przenoszenie słowa do zaliczonych
    zaliczoneSlowa.push(aktualneSlowo);
    slowa = slowa.filter(slowo => slowo !== aktualneSlowo);
    
    // Dezaktywacja przycisków
    document.getElementById('dobrze').disabled = true;
    document.getElementById('zle').disabled = true;

    console.log('Zaliczone słowa:', zaliczoneSlowa);
}

// Funkcja obsługująca kliknięcie "źle"
function zle() {
    // Dezaktywacja przycisków
    document.getElementById('dobrze').disabled = true;
    document.getElementById('zle').disabled = true;
}

// Aktualizacja czasu wyświetlania na podstawie suwaka
document.getElementById('czas').addEventListener('input', function() {
    czasWyswietlania = parseInt(this.value);
    document.getElementById('czas-wartosc').textContent = czasWyswietlania;
});

// Przypisywanie funkcji do przycisków
document.getElementById('losuj').addEventListener('click', losujSlowo);
document.getElementById('dobrze').addEventListener('click', dobrze);
document.getElementById('zle').addEventListener('click', zle);
