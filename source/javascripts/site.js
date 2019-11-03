$(document).ready(function() {
  var maxField = 10; //Input fields increment limitation
  var addButton = $(".add-button"); //Add button selector
  var wrapper = $(".field-wrapper"); //Input field wrapper
  var x = 1; //Initial field counter is 1

  //Once add button is clicked
  $(addButton).click(function() {
    //Check maximum number of input fields
    if (x < maxField) {
      x++; //Increment field counter
      var fieldHTML = `
          <div class="loan-input">
        <h5>Loan ${x}:</h5>
        <div class="loan-balance">
            <label for="loan-balance">Loan Balance:</label>
            <input type="number" class="principal" name="principal" min="1" required />
        </div>
        <div class="interest-rate">
            <label for="interest-rate">Interest Rate:</label>
            <input type="number" class="interest" name="interestRate" max="100" min="1" required />
        </div>
        <div class="subsidized-option">
            <label for="subsidize-option">Subsidized:</label>
            <input type="radio" class="subsidized" name="subsidize${x}" value="unsubsidized" required >Unsubsidized</input>
            <input type="radio" class="subsidized" name="subsidize${x}" value="subsidized">Subsidized</input>
            <label class="reveal-active" for="graduation-date">Graduation Month:</label>
            <input class="graduation-date reveal-active" type="month" name="graduation-month" value="2020-05">
            </div>
                <div class="monthly-payment">
      <label for="monthly-payment">Monthly Payment:</label>
      <input type = "number" class="monthly" name="monthlyPayment" min="1" step="0.01" />
    </div>
    <p>OR</p>
    <div class="years-freedom">
      <label for="years-freedom">Years until Freedom:</label>
      <input type = "number" class="years" name="yearsFreedom" min="1" step="0.01" />
    </div>`; //New input field html
      $(wrapper).append(fieldHTML); //Add field html
    }
  });

  //Once remove button is clicked
  $(wrapper).on("click", ".remove_button", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .remove(); //Remove field html
    x--; //Decrement field counter
  });

  $("#form").submit(function() {
    var principals = document.getElementsByClassName("principal");
    var interests = document.getElementsByClassName("interest");
    var gradDate = document.getElementsByClassName("graduation-date");
    var monthly = document.getElementsByClassName("monthly");
    var years = document.getElementsByClassName("years");

    var arr = new Array(principals.length);
    for (var i = 0; i < principals.length; i++) {
      var subsidizedVal = $(`input[name="subsidize${i + 1}"]:checked`).val();
      var sub;
      var date;
      if (gradDate[i] == null) {
        date = "000000";
      } else {
        date =
          gradDate[i].value.substring(5, 7) + gradDate[i].value.substring(0, 4);
      }
      if (subsidizedVal == "subsidized") {
        sub = true;
      } else {
        sub = false;
      }
      arr[i] = new Array(6);
      arr[i][0] = parseFloat(principals[i].value);
      arr[i][1] = parseFloat(interests[i].value);
      arr[i][2] = sub;
      arr[i][3] = date;
      arr[i][4] = parseFloat(years[i].value);
      arr[i][5] = parseFloat(monthly[i].value);
      //arr.push([principals[i].value, interests[i].value, sub, date]);
    }

    localStorage.setItem("loansArray", JSON.stringify(arr));
  });
});
