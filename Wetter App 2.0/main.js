function displayDateTime() {
    var jetzt = new Date(),
        h = jetzt.getHours(),
        m = jetzt.getMinutes(),
        wochentag = jetzt.toLocaleString('default', { weekday: 'long' }),
        tag = jetzt.getDate(),
        monat = jetzt.toLocaleString('default', { month: 'short' }),
        jahr = jetzt.getFullYear();

    m = fuehrendeNull(m);

    document.getElementById('dateTimeDisplay').innerHTML = wochentag + ', ' + tag + ' ' + monat + ' ' + jahr + ' // ' + h + ':' + m;
    
    setTimeout(displayDateTime, 500);
}

function fuehrendeNull(zahl) {
    return (zahl < 10 ? '0' : '') + zahl;
}
displayDateTime();



///////////////////////
const siteTemp = document.getElementById('navTemp');
const siteAir = document.getElementById('navAir');
const siteThree = document.getElementById('navThree');
const siteMore = document.getElementById('navMore');

document.addEventListener('DOMContentLoaded', () => {
    const siteTemp = document.getElementById('navTemp');
    const siteAir = document.getElementById('navAir');
    const siteThree = document.getElementById('navThree');
    const siteMore = document.getElementById('navMore');

    let activeElement = siteTemp;

    function setActive(element) {
        if (activeElement) {
            activeElement.classList.remove('active');
        }
        element.classList.add('active');
        activeElement = element;
    }

    siteTemp.addEventListener('click', () => setActive(siteTemp));
    siteAir.addEventListener('click', () => setActive(siteAir));
    siteThree.addEventListener('click', () => setActive(siteThree));
    siteMore.addEventListener('click', () => setActive(siteMore));
});



// Nav Bereich
const navSections = [
    { navId: 'navTemp', sectionId: 'sectionTemp' },
    { navId: 'navAir', sectionId: 'sectionAir' },
    { navId: 'navThree', sectionId: 'sectionThree' },
    { navId: 'navMore', sectionId: 'sectionMore' }
];

function showSection(selectedSectionId) {
    navSections.forEach(({ sectionId }) => {
        document.getElementById(sectionId).style.display = 
            sectionId === selectedSectionId ? 'block' : 'none';
    });
}

navSections.forEach(({ navId, sectionId }) => {
    document.getElementById(navId).addEventListener('click', () => showSection(sectionId));
});