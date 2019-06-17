/**
 * [rand] Generates random number from min to max randomized
 * @param {number} min lower border for random number
 * @param {number} max upper border for random number
 * @return {number} generated random number
 */
function rand(min,max) {
    return parseInt(Math.random() * (max-min+1)) + min;  
}


function randomRGB() {
    return 'rgb('+rand(0,255)+','+rand(0,255)+','+rand(0,255)+')';
}

/**
 * 
 * @param {*} str
 * @return 
 */
function capitalize(str) {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
}

/**
 * 
 * @param {*} str 
 * @return
 */
function capitalizeAll(str) {
    return str.replace(/[a-züäö]*/gi, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });       
}

/**
 * 
 * @param {*} str 
 * @return
 */
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(tag){
        var chars = {
            '&' : '&amp;',
            '<' : '&lt;',
            '>' : '&gt;',
            '"' : '&quot;',
            '\'' : '&apos;'
        }
        return chars[tag] || tag;
    });
}


/* TODO: Array als Parameter und Arguments als Fallback  */

function sum() {
    var erg = 0;
    for(var i = 0; i < arguments.length; i++) {
        erg = erg + arguments[i];
    }
    return erg;
}

function ascending(a, b) { 
    return a - b 
}

function descending(a, b) { 
    return b - a 
}


function minInArray(arr) {
    var min = arr[0];
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

function maxInArray(arr) {
    var max = arr[0];
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function arrayCountValues(arr) {
    var o = {};
    for(var i = 0; i < arr.length; i++) {
        o[arr[i]] = ++o[arr[i]] || 1;
    }
    return o;
}


function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while( (i = arr.indexOf(val, i+1 )) !== -1 ) {
        indexes.push(i);
    }
    return indexes;
}

function createEl(tag,txt) {
    tag = document.createElement(tag);
    if(txt) {
        txt = document.createTextNode(txt);
        tag.appendChild(txt);
    }
    return tag;
}

String.prototype.capitalize = function(){
    return this.trim().charAt(0).toUpperCase() + this.trim().slice(1);
};


function getIndex(collection, el) {
    for(var i = 0, len = collection.length; i < len ; i++ ) {
        if(collection[i] === el) {
            return i;
        }
    }
    return -1;
}

function isChecked(collection) {
    // var checked = false;
    for(var index = 0, len = collection.length; index < len; index++) {
        if(collection[index].checked) {
            // checked = true;
            return true;
        }
    }
    // return checked;
    return false;
}

function ajaxGET(url,fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            fn(xhr.responseText);
        }
    };
    xhr.send();
}

function ajaxGETXML(url,fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            fn(xhr.responseXML);
        }
    };
    xhr.send();
}
