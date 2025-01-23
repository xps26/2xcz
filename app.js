let slowa = {};
let nazwyList = [];
let aktualnaListaSlow = [];
let zaliczoneSlowa = [];
let aktualneSlowo = '';
let czasWyswietlania = 100; // Domyślny czas wyświetlania
let aktualnaListaIndex = 0; // Indeks wybranej listy

// 🛠️ Funkcja pobierająca słowa z pliku JSON
async function pobierzSlowa() {
    try {
        const response = await fetch('slowa.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        slowa = await response.json();
        nazwyList = Object.keys(slowa); // Pobranie dynamicznych nazw list
        console.log('✅ Słowa załadowane:', slowa);

        // Inicjalizacja slidera
        inicjalizujSlider();
        aktualizujListeSlow();
    } catch (error) {
        console.error('❌ Błąd podczas ładowania słów:', error);
    }
}

// 🛠️ Inicjalizacja slidera na podstawie nazw list
function inicjalizujSlider() {
    const slider = document.getElementById('dlugosc');
    slider.max = nazwyList.length; // Ustawienie maksymalnej wartości slidera
    slider.value = 1; // Domyślnie ustawiony na pierwszą listę

    const sliderWartosc = document.getElementById('dlugosc-wartosc');
    sliderWartosc.textContent = nazwyList[0]; // Wyświetlenie nazwy pierwszej listy

    slider.addEventListener('input', function () {
        aktualnaListaIndex = parseInt(this.value) - 1; // Przesunięcie indeksu (slider zaczyna od 1)
        sliderWartosc.textContent = nazwyList[aktualnaListaIndex]; // Aktualizacja nazwy listy
        aktualizujListeSlow();
        console.log(`📏 Wybrano listę: ${nazwyList[aktualnaListaIndex]}`);
    });
}

// 🛠️ Aktualizowanie listy słów na podstawie wybranego indeksu
function aktualizujListeSlow() {
    aktualnaListaSlow = [...slowa[nazwyList[aktualnaListaIndex]]];
    console.log(`📚 Aktualna lista słów (${nazwyList[aktualnaListaIndex]}):`, aktualnaListaSlow);

    if (aktualnaListaSlow.length === 0) {
        console.warn('⚠️ Brak słów w tej liście!');
        przesunNaNastepnaListe();
    }
}

// 🛠️ Automatyczne przesunięcie na następną listę, jeśli obecna jest pusta
function przesunNaNastepnaListe() {
    if (aktualnaListaIndex < nazwyList.length - 1) {
        aktualnaListaIndex++;
        const slider = document.getElementById('dlugosc');
        slider.value = aktualnaListaIndex + 1; // Przesuń slider
        document.getElementById('dlugosc-wartosc').textContent = nazwyList[aktualnaListaIndex];
        aktualizujListeSlow();
    } else {
        document.getElementById('word').textContent = 'Koniec gry! Wszystkie listy zostały wykorzystane.';
        console.log('🏁 Gra zakończona. Wszystkie listy zostały wyczerpane.');
    }
}

// 🛠️ Funkcja obsługująca kliknięcie "Powtórz słowo"
function powtorzSlowo() {
    if (aktualneSlowo) {
        document.getElementById('word').textContent = aktualneSlowo;
        setTimeout(() => {
            document.getElementById('word').textContent = '';
        }, czasWyswietlania);
    }
}

// 🛠️ Funkcja losująca słowo
function losujSlowo() {
    if (aktualnaListaSlow.length === 0) {
        document.getElementById('word').textContent = 'Brak słów do losowania!';
        console.warn('⚠️ Lista słów jest pusta!');
        przesunNaNastepnaListe();
        return;
    }
    
    const index = Math.floor(Math.random() * aktualnaListaSlow.length);
    aktualneSlowo = aktualnaListaSlow[index];
    
    document.getElementById('word').textContent = aktualneSlowo;
    setTimeout(() => {
        document.getElementById('word').textContent = '';
    }, czasWyswietlania);

    document.getElementById('dobrze').disabled = false;
    document.getElementById('zle').disabled = false;
    document.getElementById('powtorz').disabled = false;
}

// 🛠️ Funkcje "Dobrze" i "Źle"
function dobrze() {
    zaliczoneSlowa.push(aktualneSlowo);
    aktualnaListaSlow = aktualnaListaSlow.filter(slowo => slowo !== aktualneSlowo);

    document.getElementById('dobrze').disabled = true;
    document.getElementById('zle').disabled = true;

    if (aktualnaListaSlow.length === 0) {
        przesunNaNastepnaListe();
    }
    console.log('✅ Zaliczone słowa:', zaliczoneSlowa);
}

function zle() {
    document.getElementById('dobrze').disabled = true;
    document.getElementById('zle').disabled = true;
}

// 🛠️ Aktualizacja czasu wyświetlania słów
document.getElementById('czas').addEventListener('input', function() {
    czasWyswietlania = parseInt(this.value);
    document.getElementById('czas-wartosc').textContent = czasWyswietlania;
    console.log(`⏱️ Czas wyświetlania ustawiony na ${czasWyswietlania} ms`);
});

// 🛠️ Funkcja resetująca aplikację
function resetAplikacji() {
    console.log('🔄 Resetowanie aplikacji...');
    aktualnaListaIndex = 0; // Reset indeksu listy
    zaliczoneSlowa = []; // Wyczyść zaliczone słowa
    aktualnaListaSlow = []; // Wyczyść bieżącą listę
    aktualneSlowo = ''; // Wyczyść aktualne słowo

    // Zresetuj wyświetlanie
    document.getElementById('word').textContent = '';
    document.getElementById('dobrze').disabled = true;
    document.getElementById('zle').disabled = true;
    document.getElementById('powtorz').disabled = true;

    // Zresetuj slider
    const slider = document.getElementById('dlugosc');
    slider.value = 1; // Ustaw na pierwszą listę
    document.getElementById('dlugosc-wartosc').textContent = nazwyList[0];

    // Ponownie wczytaj dane z JSON
    pobierzSlowa();
}

// 🛠️ Dodanie obsługi kliknięcia przycisku "Reset"
document.getElementById('reset').addEventListener('click', resetAplikacji);


// 🛠️ Pobranie słów przy starcie
pobierzSlowa();
document.getElementById('losuj').addEventListener('click', losujSlowo);
document.getElementById('powtorz').addEventListener('click', powtorzSlowo);
document.getElementById('dobrze').addEventListener('click', dobrze);
document.getElementById('zle').addEventListener('click', zle);
