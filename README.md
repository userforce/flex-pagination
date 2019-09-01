## Flex Pagination

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/userforce/flex-pagination/master/package.json&label=name&query=$.name&color=blue)
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/userforce/flex-pagination/master/package.json&label=version&query=$.version&color=blue)
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/userforce/flex-pagination/master/package.json&label=license&query=$.license&color=lightgrey)
![version](https://img.shields.io/badge/build-passing-green)
![version](https://david-dm.org/userforce/cascade-gallery.svg)
![version](https://img.shields.io/npm/dt/flex-pagination)


Vue.js **2.0^** powerful but simple pagination component which is fully customizable and easy to use.
Check flex pagination [documentation](https://userforce.github.io/flex-pagination/example/) for more 
[examples](https://userforce.github.io/flex-pagination/example/).

#### Installation
```javascript
npm install flex-pagination
```


#### Basic example
Flex pagination requires **[:pagination=""]** property which must be of type object and have 2 child properties.
**[page]** type (int) which is current active page;  
**[total]** type (int) which is total amount of pages;
```xml
<flex-pagination :pagination="pagination"></flex-pagination>
```
```vue
pagination: { 
    page: 10, 
    total: 50 
}
```

#### Ranges
Optional property **[:range=""]** is defining how many page are shown around current page which are set to 5 by default.  
**[before]** type (int) number of pages before current;  
**[after]** type (int) number of pages after current;  

**NOTE:** Ranges was pulled out of configuration because of its frequent usage.
```xml
<flex-pagination :pagination="pagination" :range="range"></flex-pagination>
```
```vue
range: { 
    before: 3, 
    after: 0 
}
```

#### Hide elements
**[show]** property of the **[:config="]** object defines which visual elements must be hide or show.  
**[first]**, **[prev]**, **[next]**, **[last]** type (boolean) default True;
```xml
<flex-pagination :pagination="pagination" :config="config"></flex-pagination>
```
```vue
config: { 
    show: { 
        first: false, 
        last: false, 
        next: true, 
        prev: false
    }
}
```

#### Hide elements
Each time you navigate on pagination an event is emitted. By default event name is 'flexp:page'. You can define a custom event name using config **[event]** property.
**[event]** type (string) default 'flexp:page';

**NOTE:** The event handler is receiving selected page number in the first parameter.
```xml
<flex-pagination :pagination="pagination" :v-on:my:custom:event="myEventHandler" :config="config">
```
```vue
data: { 
    currentPageContent: '',
    pagination: {
        page: 10,

        // NOTE: total pages will be updated after "request" result. 
        // For demonstration purpose, a random number will be taken in between 40 and 50.
        total: 44 
    },
    config: {
        event: 'my:custom:event'
    },
}
methods: { 
    myEventHandler(pageNumber) {
        let self = this;
        self.makeRequest(pageNumber).then(function(response){
            self.currentPageContent = response.data;
        });
    }
}
```

#### Hide elements
Each time you navigate on pagination an event is emitted. By default event name is 'flexp:page'. You can define a custom event name using config **[event]** property.
**[event]** type (string) default 'flexp:page';

**NOTE:** The event handler is receiving selected page number in the first parameter.


#### Customization
Check flex pagination [documentation](https://userforce.github.io/flex-pagination/example/) for more 
[examples](https://userforce.github.io/flex-pagination/example/).