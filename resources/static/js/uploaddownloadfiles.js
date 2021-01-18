

$(document).ready(function () {
 
  $("#uploadSingleFileForm").submit(function (evt) {
    evt.preventDefault();

    let formData = new FormData($(this)[0]);

    $.ajax({
      url: "/api/file/upload",
      type: "POST",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
        $("#response").empty();
        if (response.status !== "error") {
          let displayInfo =
            response.filename + " : " + response.message + "<br>";

          $("#response").append(displayInfo);
          $("#response").css("display", "block");
          $("#response").css("background-color", "#e6e6ff");
          $("#response").css("border", "solid 1px black");
          $("#response").css("border-radius", "3px");
          $("#response").css("margin", "10px");
          $("#response").css("padding", "10px");
        } else {
          $("#response").css("display", "none");
          let error = response.error;
          alert(error);
        }
      },
      error: function (e) {
        alert("Fail! " + e);
      },
    });

    return false;
  });
  $("#uploadSingleFileUserForm").submit(function (evt) {
    evt.preventDefault();

    let formData = new FormData($(this)[0]);

    $.ajax({
      url: "/api/fileu/upload",
      type: "POST",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function (response) {
        $("#response").empty();
        if (response.status !== "error") {
          let displayInfo =
            response.filename + " : " + response.message + "<br>";

          $("#response").append(displayInfo);
          // add some css
          $("#response").css("display", "block");
          $("#response").css("background-color", "#e6e6ff");
          $("#response").css("border", "solid 1px black");
          $("#response").css("border-radius", "3px");
          $("#response").css("margin", "10px");
          $("#response").css("padding", "10px");
        } else {
          $("#response").css("display", "none");
          let error = response.error;
          alert(error);
        }
      },
      error: function (e) {
        alert("Fail! " + e);
      },
    });

    return false;
  });

  
});
