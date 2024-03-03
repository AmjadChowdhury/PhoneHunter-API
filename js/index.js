const loadPhone = async(searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhone(phones,isShowAll);
}

function displayPhone(phones,isShowAll){
    const parentDiv = document.getElementById('divContainer');
    parentDiv.textContent = '';
    const showAll = document.getElementById('ShowAllContainer');
    if(phones.length > 12 && !isShowAll){
        showAll.classList.remove('hidden')
        phones = phones.slice(0,12);
    }
    else{
        showAll.classList.add('hidden')
    }

    for(const phone of phones){
        console.log(phone)
        const childDiv = document.createElement('div');
        childDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}!</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent">Show details</button>
            </div>
        </div>
        `
        childDiv.classList = `card w-96 bg-base-100 shadow-xl`
        parentDiv.appendChild(childDiv);
    }

    //hide loading spinner...
    toggleLoadingSpinner(false)
}

const handleShowDetails = async(id) => {
    // console.log("Click korsi",id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data.data)

    showPhoneDetails(data.data);
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const showDetailsContainer = document.getElementById('showDetailsContainer')
    showDetailsContainer.innerHTML = `
    <div class="flex justify-center">
       <img src="${phone.image}">
    </div>

    <div>
       <p><span class="text-lg font-extrabold mb-2">Phone Name : </span><span>${phone.name}</span></p>
       <p><span class="text-lg font-bold">Brand : </span><span>${phone.brand}</span></p>
       <p><span class="text-lg font-bold">Storage : </span><span>${phone.mainFeatures.storage}</span></p>
       <p><span class="text-lg font-bold">Display Size : </span><span>${phone.mainFeatures.displaySize}</span></p>
       <p><span class="text-lg font-bold">Chip Set : </span><span>${phone.mainFeatures.chipSet}</span></p>
       <p><span class="text-lg font-bold">Memory : </span><span>${phone.mainFeatures.memory}</span></p>
       <p><span class="text-lg font-bold">Release Date : </span><span>${phone.releaseDate}</span></p>
       <p><span class="text-lg font-bold">GPS : </span><span>${phone.others?.GPS ? phone.others.GPS : 'GPS not available'}</span></p>
    </div>
    `


    show_details_modal.showModal();
}

function handleSearch(isShowAll){
    toggleLoadingSpinner(true);
    const searchId = document.getElementById('searchText');
    const searchText = searchId.value;
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loadingSpinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const showAll = () => {
    handleSearch(true);
}

loadPhone('13',false);