const submit_device_code = document.getElementById("submit-device-code");
const device_code_module_reg = document.getElementById("device-code-module-reg");

submit_device_code.addEventListener('click', function() {
    if (device_code_module_reg.value == localStorage.getItem("device_code")) {
        document.getElementById("return-back-module-reg").textContent = "Success!! Return to the main page.";
        localStorage.setItem("device_connected", "true");
    }
    device_code_module_reg.value = "";
});
