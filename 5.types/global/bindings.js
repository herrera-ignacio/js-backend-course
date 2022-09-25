// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = {a: 'Custom'};

// We declare a variable and the variable is assigned to the global window as its property.
a = 'Global';

function whatsThis(text) {
  console.log(text, this.a);  // The value of this is dependent on how the function is called
}

whatsThis("default");          // 'Global' as this in the function isn't set, so it defaults to the global/window object
whatsThis.call(obj, "call");  // 'Custom' as this in the function is set to obj
whatsThis.apply(obj, ["apply"]); // 'Custom' as this in the function is set to obj
whatsThis.bind(obj)("bind");  // 'Custom' as this in the function is set to obj
