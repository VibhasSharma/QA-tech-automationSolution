var webDriver = require ('selenium-webdriver');
By = webDriver.By;
until = webDriver.until;

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
var dateTime = date+' '+time;

var driver = new webDriver.Builder().forBrowser('chrome').build();
driver.manage().window().maximize().then(function () {
    console.log(dateTime + " || log: Browser window maximized");
});
driver.get('http://localhost:3000');
driver.sleep(3000);
driver.findElement(By.xpath("//span[text()='Render the Challenge']")).click();

driver.findElement(By.xpath("//h1[text() = 'Arrays Challenge']")).getText().then(function(text){
    if(text === 'Arrays Challenge'){
        console.log(dateTime + " || log: Array\'s Challenge Rendered");
    }else{
        console.log(dateTime + " || log: Array\'s Challenge not available");
    }
});

// get the number of rows in table
let count = driver.findElements(By.tagName("tr")).then(async function rowCountFun(tableEls){
    let rowCount = tableEls.length; 
    return rowCount; 
});

const rowCountTotal = () => {
    count.then((numberOfRows) => {
        console.log(dateTime + " || log: Total number of Rows in Table :: "+ numberOfRows);

        for(let numberOfRows = 1; numberOfRows <= 3; numberOfRows++){
            driver.findElements(By.xpath("//tbody//child::tr["+numberOfRows+"]")).then(function elementsArray(elements){
                elements.map(function(element){
                    element.getText().then(function(txt){
                        var stringArray = txt.split(" ");
                        let numArray = stringArray.map((i) => Number(i));
                        console.log(dateTime + " || log: Row " + numberOfRows + " array elements :: "+ numArray);
        
                        function findElement(arr) {
                            let rightHalfSum = 0, leftHalfSum = 0;
                        
                            // Computing sum right to pivot
                            for (let i = 1; i < arr.length; i++)
                                rightHalfSum = rightHalfSum + arr[i];
                        
                            // Checking partition point
                            for (let i = 0, j = 1; j < arr.length; i++, j++) {
                                rightHalfSum = rightHalfSum - arr[j];
                                leftHalfSum = leftHalfSum + arr[i];
                        
                                if (leftHalfSum === rightHalfSum)
                                    return arr[i + 1];
                            }
                        
                            return null;
                        }
                        
                        console.log(dateTime + " || log: The pivot output is :: " + findElement(numArray));
                        driver.findElement(By.xpath("//div[text()='submit challenge 1']//following::input["+numberOfRows+"]")).sendKeys(findElement(numArray));
                    });
                });
            });
        }

    });
}

rowCountTotal();

driver.findElement(By.xpath("//div[text()='Your Name']//following::input")).sendKeys("Vibhas Sharma");
driver.findElement(By.xpath("//span[text()='Submit Answers']")).click();

driver.findElement(By.xpath("//div[contains(text(), 'It looks like your answer')]")).getText().then(function(modalText){
    if(modalText === 'It looks like your answer wasn\'t quite right ❌'){
        console.log(dateTime + " || log: Test case failed");
    }else if(modalText === 'Congratulations you have succeeded. Please submit your challenge ✅'){
        console.log(dateTime + " || log: Test case passed");
    }
});

driver.findElement(By.xpath("//span[text() = 'Close']")).click();

driver.sleep(2000);
driver.quit();

