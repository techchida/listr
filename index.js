// create a javascript class 
class listr {
    constructor(elem, opt) {
        this.element = elem;
        this.options = opt;
        
    }
    buildList(){
        this.element.style.display = 'none'

        //create listr
        const listr = document.createElement('div')
        listr.classList.add('listr')
        this.element.parentNode.insertBefore(listr, this.element.previousSibling)


        //create faux input
        const fauxInput = document.createElement('div')
        fauxInput.classList.add('listr-faux-input')
        listr.appendChild(fauxInput)
        fauxInput.addEventListener('click',(ev)=>{
            if(ev.target.nextSibling != null){
            ev.target.nextSibling.classList.toggle('active')
            }
        })

        //create faux input text
        const fauxInputText = document.createElement('span')
        fauxInputText.classList.add('listr-faux-input-text')
        fauxInputText.innerText = this.options.lang?.placeholder || 'Select an option...'
        fauxInput.appendChild(fauxInputText)


        const container = document.createElement('div')
        container.classList.add('listr-container')
        listr.appendChild(container)

        //when click outside container, hide container
        document.addEventListener('click', (ev)=>{
            if(!ev.target.classList.contains('listr-faux-input') 
            && !ev.target.classList.contains('listr-item') 
            && !ev.target.classList.contains('listr-search-bar') 
            && !ev.target.classList.contains('listr-close') 
            && !ev.target.classList.contains('listr-pill') 
             ){
                container.classList.remove('active')
            }
        })

        // search bar 
        const searchBar = document.createElement('input')
        searchBar.setAttribute('contenteditable', true)
        searchBar.classList.add('listr-search-bar')
        searchBar.setAttribute('placeholder', this.options.lang?.searchText  || 'Search')
        container.appendChild(searchBar)

        // dropdown list
        const dropdown = document.createElement('div')
        dropdown.classList.add('listr-dropdown')

        const dropdownList = document.createElement('div')
        dropdownList.classList.add('listr-dropdown-list')
        dropdown.appendChild(dropdownList)

        for( let i in this.options.data){
            //create random id
            const newID = Math.random().toString(36).substr(2, 9);
            const item = document.createElement('div')
            item.classList.add('listr-item')
            item.setAttribute('id',newID)
            item.innerText = this.options.data[i]?.text || this.options.data[i]
            item.setAttribute('value',this.options.data[i]?.value || this.options.data[i])
            item.addEventListener('click',(ev)=>{

                //hide faux-input text
                fauxInputText.style.display = 'none'

                // if item has been selected unselect item
                if(ev.target.classList.contains('selected')){
                    ev.target.classList.remove('selected')
                    document.querySelector(`[x="${ev.target.id}"]`).parentNode.remove()
                    if(fauxInput.children.length === 1){
                        fauxInputText.style.display = 'block'
                    }
                    //reset the value of this.element
                    let selectedValues = []
                    document.querySelectorAll('.listr-pill').forEach((pill)=>{
                        selectedValues.push(pill.getAttribute('value'))
                    })
                    this.element.value = selectedValues

                    return
                }

          
                


                // add selected class to the clicked item
                ev.target.classList.add('selected')

                const pill = document.createElement('span')
                pill.classList.add('listr-pill')
                pill.setAttribute('value',ev.target.getAttribute('value'))
                pill.innerText = ev.target.innerText
                
                const close = document.createElement('span')
                close.classList.add('listr-close')
                close.setAttribute('x',newID)
                close.addEventListener('click', (ev)=>{
                    item.classList.remove('selected')
                    ev.target.parentNode.remove()
                    if(fauxInput.children.length === 1){
                        fauxInputText.style.display = 'block'
                    }

                    //reset the value of this.element
                    let selectedValues = []
                    document.querySelectorAll('.listr-pill').forEach((pill)=>{
                        selectedValues.push(pill.getAttribute('value'))
                    }
                    )
                    this.element.value = selectedValues
                })

                pill.appendChild(close)
                fauxInput.appendChild(pill)

                      //set value of this.element to be an array of selected values
                      let selectedValues = []
                      document.querySelectorAll('.listr-pill').forEach((pill)=>{
                          selectedValues.push(pill.getAttribute('value'))
                      })
                      this.element.value = selectedValues

                // searchBar.innerText = ev.target.innerText
                dropdown.classList.remove('active')
            })
            dropdownList.appendChild(item)
        }
        container.appendChild(dropdown)

        //create a search function for all items in dropdown 
        searchBar.addEventListener('keyup', (ev)=>{
            const searchValue = ev.target.value.toLowerCase()
            const items = dropdownList.children
            for(let i = 0; i < items.length; i++){
                const item = items[i]
                if(item.innerText.toLowerCase().indexOf(searchValue) > -1){
                    item.style.display = 'block'
                }else{
                    item.style.display = 'none'
                }
                
            }
            //if nothing is found display 404 text
            if(dropdownList.innerText === ''){
                const notFound = document.createElement('div')
                notFound.classList.add('listr-item')
                notFound.classList.add('listr-item 404')
                notFound.innerText = this.options.lang?.noResults || 'Not found'
                dropdownList.appendChild(notFound)
            }

     
        }
        )
        
    }

    init() {
        this.buildList()
    }
}


