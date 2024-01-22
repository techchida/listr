# ListR!

Build simple and fluid HTML select dropdowns with **ListR**

## Getting Started

Listr  can be used by including the javascript in your code 

    <script src="./path_to/listr.js"> </script>

## Usage

Listr is a class that accepts two parameters. 
1. The Html element ID or class name to bind an instance of **listR** to
2. Options for the **listR** instance

To create a simple instance of Listr. 
    
    let listData = [ "one", "two", "three" ];
    const options = { data:listData , multichoice: false};
	const myList = new Listr("#myListElement", options);
		 
    

# ListR options 

 - data
 - name
 - multichoice
 - search
 - lang

## Data
Listr builds a new list from a simple data array



    data = ["apple","carrots", "banana"]
or an array of objects with text and value properties

    data = [
    {text:"fruit-1", value:"apple"},
    {text:"fruit-2", value:"carrots"},
    {text:"fruit-3", value:"banana" }
    ]

  

## Name
Listr  attaches a psuedo formvalue to each list for form handling

    {
    name: fruits
    }


## Multichoice

You can enable the multiple selection with the **multichoice** option.  By default the multichoice option is set to true

    {
    multichoice: true
    }
## Search
The search function for each list can be toggled with  the **search**  option which is true by default

    {
    search: true
    }

## lang
The lang options defines the languages of default place holders 

     {
      placeholder: "Please select a fruit",
      searchText: "Find a fruit"
	}

