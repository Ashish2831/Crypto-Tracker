const searchForm = document.querySelector('#searchForm');
const tableResult = document.querySelector('#tableResult');
let update;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (update) {
        clearTimeout(update);
    }
    const ctype = searchForm.elements.coinType.value;
    fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
    const res = await fetch(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    const data = await res.json();
    
    const price = data.coin.price;
    const volume = data.coin.volume;
    const change = data.coin.priceChange1d;
    const base = data.coin.name;
    const target = 'USD';

    tableResult.innerHTML = `<tr style="background-color:blue; color:white; font-weight:700">
                                <td>Property</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>${base}</td>
                                <td>${price} ${target}</td>
                            </tr>
                            <tr>
                                <td>Volume</td>
                                <td>${volume}</td>
                            </tr>
                            <tr>
                                <td>Change</td>
                                <td>${change}</td>
                            </tr>`

    update = setTimeout(() => fetchPrice(ctype), 10000);
}
