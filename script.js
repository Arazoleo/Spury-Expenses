class Expense{
    constructor(year, month, day, description, type, price){
        this.year = year
        this.month = month
        this.day = day
        this.description = description
        this.type = type
        this.price = price
    }

    DataValid(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }

}
   
class DataBank{

    constructor(){
        let id = localStorage.getItem("id")

        if(id === null){
            localStorage.setItem('id', 0) 
        }
        
    }

    getNextId(){
        let nextID = localStorage.getItem('id')
        return parseInt(nextID) + 1
    }

    Rec(x){
        let id = this.getNextId()
        x.id = id
        localStorage.setItem(id, JSON.stringify(x))
        localStorage.setItem('id', id)
    }

    loadAllRegisters() {

		
		let exp = Array()

		let id = localStorage.getItem('id')

		
		for(let i = 1; i <= id; i++) {

			
			let ex = JSON.parse(localStorage.getItem(i))

			if(ex === null) {
				continue
			}
            exp.id = i
			exp.push(ex)
		}

		return exp
	}

    Search(exp){
        let expFilter = Array()
        expFilter = this.loadAllRegisters()

       if(exp.year != ''){ 
        expFilter = expFilter.filter(x => x.year == exp.year)
       }

       if(exp.month != ''){ 
        expFilter = expFilter.filter(x => x.month == exp.month)
       }

       if(exp.day != ''){ 
        expFilter = expFilter.filter(x => x.day == exp.day)
       }

       if(exp.type != ''){ 
        expFilter = expFilter.filter(x => x.type == exp.type)
       }

       if(exp.description != ''){ 
        expFilter = expFilter.filter(x => x.description == exp.description)
       }

       if(exp.price != ''){ 
        expFilter = expFilter.filter(x => x.price == exp.price)
       }

       return expFilter
    }

    deleteExpense(id) {
        localStorage.removeItem(id);
    }
}

let dbank = new DataBank()

function downMenu(){
    var menu = document.getElementById("menu");
    var link = document.getElementById("menu-links")
    
    if(menu.style.height == "150px"){
        menu.style.height = "250px"
        link.classList.remove("hidden")
    }
        
    else{
        menu.style.height = "150px"
        
        link.classList.add("hidden")
    
    }

}


function sendMenu(){
    window.location.href = "index.html"
}





function NewExpense(){
    let year = document.getElementById("year")
    let month = document.getElementById("month")
    let day = document.getElementById("day")
    let type = document.getElementById("type")
    let price = document.getElementById("value")
    let description = document.getElementById("description")

    let expense = new Expense(
        year.value,
        month.value,
        day.value,
        description.value,
        type.value,
        price.value
    )

    if (expense.DataValid()) {
        dbank.Rec(expense);
        
        document.getElementById('modal_title').innerHTML = "Register successfully included";
        document.getElementById('modal_title_div').className = "modal-header text-success";
        document.getElementById('modal_content').innerHTML = "Expense Successfully Registered";
        document.getElementById('modal_btn').classList = 'btn btn-success';
        year.value = ''
        month.value = ''
        day.value = ''
        type.value = ''
        price.value = ''
        description.value = ''

      } else {
        document.getElementById('modal_title').innerHTML = "Error in Register";
        document.getElementById('modal_title_div').className = "modal-header text-danger";
        document.getElementById('modal_content').innerHTML = "Error in recording, please check if all the fields are completed correctly";
        document.getElementById('modal_btn').classList = 'btn btn-danger';
      }
      
      $("#sucRec").modal('show');
      
      
}

function ExpenseList(ex = Array(), filter = false){
    
    if(ex.lenght == 0 && filter == false){
        ex = dbank.loadAllRegisters()
    }
	 

	let list = document.getElementById('listExp')
    list.innerHTML = ''


    ex.forEach(function(x){
        let row = list.insertRow()

        row.insertCell(0).innerHTML = `${x.day}/${x.month}/${x.year}`

        switch(x.type){
            case '1':
                x.type = 'Food'
                break;
            case '2':
                    x.type = 'Transport'
                    break;
            case '3':
                    x.type = 'Leisure'
                    break;
            case '4':
                    x.type = 'Health'
                    break;  
            case '5':
                    x.type = 'Education'
                    break;  

        }

        row.insertCell(1).innerHTML = x.type

        row.insertCell(2).innerHTML = x.description
        row.insertCell(3).innerHTML = x.price

        let but = document.createElement("button")
        but.className = 'btn btn-danger'
        but.innerHTML = 'Delete'
        but.id = x.id
        but.onclick = function(){
            dbank.deleteExpense(this.id);
            ExpenseList();
        }
        row.insertCell(4).append(but)
    })
}

function searchExpense(){
    let year = document.getElementById("year")
    let month = document.getElementById("month")
    let day = document.getElementById("day")
    let type = document.getElementById("type")
    let price = document.getElementById("value")
    let description = document.getElementById("description")

    
    let expen = new Expense(year.value, month.value, day.value, description.value, type.value, price.value)
    let ex = dbank.Search(expen)

    this.ExpenseList(ex, true)

    
  

}   
 