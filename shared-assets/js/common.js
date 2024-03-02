var _ValidationRunning = false;
var isSingleBillingCountry = false;
var isSingleBillingCountryValue = "";
var EmailValidate = false;
var errorsObj = [];

var isSingleShippingCountry = false;
var isSingleShippingCountryValue = "";
var defaultLanguageType = "English";

var defaultLanguage = {
    type: "English",
    creditCardNumberRequired: "Credit card number is required",
    creditCardNumberInvalid: "Credit card number is invalid",
    creditCardTypeJCB:
        "Credit card type JCB (Japan Credit Bureau) is not accepted",
    creditCardTypeDC: "Credit card type Diners Club is not accpeted",
    CVV2Invalid: "CVV2 is invalid",
    creditCardExpirationInvalid: "Credit Card Expiration Date is not valid",
    titleRequired: "Title is required",
    firstNameRequired: "First Name is required",
    lastNameRequired: "Last Name is required",
    billingNameRequired: "Billing Name is required",
    addressRequired: "Address is required",
    cityRequired: "City is required",
    stateRequired: "State is required",
    zipRequired: "Zip is required",
    countryRequired: "Country is required",
    phoneRequired: "Phone is required",
    phoneInvalid:
        "Phone is invalid. Please enter a phone number in the format ###-###-####",
    phoneInvalidUK:
        "Phone is invalid.Please enter a phone number in the format ###-####-####",
    emailRequired: "Email is required",
    emailInvalid: "Invalid Email Address",
    shippingfirstNameRequired: "Shipping First Name is required",
    shippingLastNameRequired: "Shipping Last Name is required",
    shippingNameRequired: "Shipping Name is required",
    shippingAddressRequired: "Shipping Address is required",
    shippingCityRequired: "Shipping City is required",
    shippingStateRequired: "Shipping State is required",
    shippingZipRequired: "Shipping Zip is required",
    shippingCountryRequired: "Shipping Country is required",
    validationHeader: "Please correct the following issues:",
    passwordRequired: "Password is required",
    confirmPasswordRequired: "Confirm Password is required",
    passwordMismatch: "Password and Confirm Password must match"
};
var languages = [
    defaultLanguage,
    {
        type: "Spanish",
        creditCardNumberRequired: "Se requiere número de tarjeta de crédito",
        creditCardNumberInvalid:
            "El número de la tarjeta de crédito es inválido",
        creditCardTypeJCB:
            "No se acepta el tipo de tarjeta de crédito JCB (Japan Credit Bureau)",
        creditCardTypeDC:
            "No se acepta el tipo de tarjeta de crédito Diners Club",
        CVV2Invalid: "CVV2 no es válido",
        creditCardExpirationInvalid:
            "La fecha de caducidad de la tarjeta de crédito no es válida",
        titleRequired: "Se requiere título",
        firstNameRequired: "Se requiere el primer nombre",
        lastNameRequired: "Apellido es requerido",
        billingNameRequired: "Se requiere el nombre de facturación",
        addressRequired: "La dirección es necesaria",
        cityRequired: "La ciudad es requerida",
        stateRequired: "Se requiere estado",
        zipRequired: "Se requiere Zip",
        countryRequired: "Se requiere un país",
        phoneRequired: "Se requiere teléfono",
        phoneInvalid:
            "El teléfono no es válido. Ingresa un número de teléfono en el formato ### - ### - ####",
        phoneInvalidUK:
            "El teléfono no es válido. Ingresa un número de teléfono en el formato ### - #### - ####",
        emailRequired: "Correo electronico es requerido",
        emailInvalid: "Dirección de correo electrónico no válida",
        shippingfirstNameRequired: "Se requiere el primer nombre de envío",
        shippingLastNameRequired: "Se requiere el apellido del envío",
        shippingNameRequired: "Se requiere el nombre de envío",
        shippingAddressRequired: "Se requiere dirección de envío",
        shippingCityRequired: "Ciudad de envío es requerida",
        shippingStateRequired: "Se requiere un estado de envío",
        shippingZipRequired: "Se requiere envío postal",
        shippingCountryRequired: "Se requiere el envío del país",
        validationHeader: "Corrija los siguientes problemas:",
        passwordRequired: "Se requiere contraseña",
        confirmPasswordRequired: "Confirmar contraseña es requerida",
        passwordMismatch:
            "La contraseña y la contraseña de confirmación deben coincidir"
    },
    {
        type: "French",
        creditCardNumberRequired: "Le numéro de carte de crédit est requis",
        creditCardNumberInvalid: "Numéro de carte de crédit est invalide",
        creditCardTypeJCB:
            "Le type de carte de crédit JCB (Japan Credit Bureau) n'est pas accepté",
        creditCardTypeDC:
            "Le type de carte de crédit Diners Club n'est pas accepté",
        CVV2Invalid: "CVV2 est invalide",
        creditCardExpirationInvalid:
            "La date d'expiration de la carte de crédit n'est pas valide",
        titleRequired: "Le titre est requis",
        firstNameRequired: "Le prénom est requis",
        lastNameRequired: "Nom de famille est requis",
        billingNameRequired: "Nom de facturation requis",
        addressRequired: "L'adresse est requise",
        cityRequired: "La ville est obligatoire",
        stateRequired: "L'état est requis",
        zipRequired: "Zip est obligatoire",
        countryRequired: "Pays requis",
        phoneRequired: "Le téléphone est requis",
        phoneInvalid:
            "Le numéro de téléphone est invalide, veuillez entrer un numéro de téléphone au format ### - ### - ####",
        phoneInvalidUK:
            "Le numéro de téléphone est invalide, veuillez entrer un numéro de téléphone au format ### - #### - ####",
        emailRequired: "L'email est requis",
        emailInvalid: "Adresse e-mail invalide",
        shippingfirstNameRequired: "Le prénom de livraison est requis",
        shippingLastNameRequired: "Le nom de famille est requis",
        shippingNameRequired: "Le nom d'expédition est requis",
        shippingAddressRequired: "L'adresse de livraison est requise",
        shippingCityRequired: "La ville d'expédition est requise",
        shippingStateRequired: "État de livraison requis",
        shippingZipRequired: "Zip d'expédition est requis",
        shippingCountryRequired: "Le pays d'expédition est requis",
        validationHeader: "Veuillez corriger les problèmes suivants:",
        passwordRequired: "Mot de passe requis",
        confirmPasswordRequired: "Confirmer le mot de passe est requis",
        passwordMismatch:
            "Le mot de passe et le mot de passe de confirmation doivent correspondre"
    }
];

function MM_openBrWindow(theUrl, winName, features) {
    window.open(theUrl, winName, features);
}

var QueryString = (function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
})();

var Language = (function () {
    var language = defaultLanguageType;
    var query = "";
    var scripts = document.getElementsByTagName("script");
    for (var t = 0; t < scripts.length; t++) {
        if (scripts[t].src.match("common")) {
            query = scripts[t].src.split("?");
        }
    }

    if (query.length > 1) {
        var vars = query[1].split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0].toLowerCase() == "language") {
                language = pair[1];
                break;
            }
        }
    }
    return language;
})();

function SetFormLanguage(language, overrideMessages) {
    var collection = null;
    for (var i = 0; i < languages.length; i++) {
        var languageCollection = languages[i];
        if (
            languageCollection.type == "LM" ||
            languageCollection.type.toLowerCase() == language.toLowerCase()
        ) {
            collection = languageCollection;
            break;
        }
    }
    if (collection == null) {
        collection = defaultLanguage;
    }

    if (typeof overrideMessages !== "undefined") {
        $.each(overrideMessages, function (key, val) {
            var propertyName = key;
            var overrideMessage = val;

            collection[propertyName] = overrideMessage;
        });
    }
    return collection;
}

var errorMessages = SetFormLanguage(Language);

function updateZipByCountry() {
    var id = $(this).attr("id").replace("Country", "");
    var defualtType = "text";
    var usaType = "tel";
    var setType;
    var zip = $("#" + id + "Zip, #zc");
    var country = $(this).val();
    var attrName = "type";

    switch (country) {
        case "USA":
            zip.attr(attrName, usaType);
            setType = usaType;
            break;
        default:
            zip.attr(attrName, defualtType);
            setType = defualtType;
            break;
    }

    var currentType = zip.attr(attrName);
    if (currentType != setType) {
        var newElement = $("<input type='" + setType + "'/>");
        var attributes = zip[0].attributes;
        if (attributes != undefined) {
            $.each(attributes, function (key, value) {
                if (value.name != attrName) {
                    newElement.attr(value.name, value.value);
                }
            });
        }
        newElement.val(zip.val());
        var parent = zip.parent();
        zip.remove();
        newElement.appendTo(parent);
    }
}

function toggleCardInfo() {
    if (!$("#ValidateCardInfo").attr("checked")) $("#paymentForm").show();
    else $("#paymentForm").hide();
}

function toggleShipping() {
    if (
        jQuery.prototype.jquery == "1.9.1" ||
        jQuery.prototype.jquery == "1.11.1"
    ) {
        if ($("#ShippingIsDifferentThanBilling").is(":checked"))
            $("#shippingInformation").show();
        else $("#shippingInformation").hide();
    } else {
        if ($("#ShippingIsDifferentThanBilling").attr("checked"))
            $("#shippingInformation").show();
        else $("#shippingInformation").hide();
    }
}

function ischeckedss() {
    if (
        jQuery.prototype.jquery == "1.9.1" ||
        jQuery.prototype.jquery == "1.11.1"
    ) {
        return $("#ShippingIsDifferentThanBilling").is(":checked");
    } else {
        return $("#ShippingIsDifferentThanBilling").attr("checked");
    }
}

function validateForm(e, returnIsValid, returnErrorObj) {
    if (!_ValidationRunning) {
        _ValidationRunning = true;
        $(this)
            .closest("form")
            .find('input[type="text"]')
            .each(function (i, item) {
                $(item).val($.trim($(item).val()));
            });

        if (typeof onFormPreValidation == "function") {
            var preValidationMessages = onFormPreValidation(e);
            if (
                preValidationMessages != null &&
                preValidationMessages.length > 0
            ) {
                for (var i = 0; i < preValidationMessages.length; i++) {
                    let preErrMessage = preValidationMessages[i].message
                        ? preValidationMessages[i].message
                        : preValidationMessages[i];

                    errorsObj.push({
                        message: preErrMessage,
                        element: preValidationMessages[i].element
                    });
                }
            }
        }

        let hasNoOrderType =
            typeof $("input[name=OrderType]:checked").val() === "undefined";
        let orderTypeValue = "";
        let orderTypeValueLower = "";
        if (!hasNoOrderType) {
            orderTypeValue = $("input[name=OrderType]:checked").val();
            orderTypeValueLower = orderTypeValue.toLowerCase();
        }
        if (
            hasNoOrderType ||
            orderTypeValue == "" ||
            orderTypeValueLower.indexOf("card") > -1 ||
            orderTypeValueLower.indexOf("splitit") > -1 ||
            orderTypeValueLower.indexOf("braintree") > -1 ||
            orderTypeValueLower.indexOf("klarna") > -1 ||
            orderTypeValueLower.indexOf("afterpay") > -1 ||
            orderTypeValueLower.indexOf("affirm") > -1
        ) {
            try {
                trimOrderFields();
                if (
                    $("#CardNumber").length > 0 &&
                    ($("#ValidateCardInfo").length == 0 ||
                        !$("#ValidateCardInfo").attr("checked")) &&
                    (hasNoOrderType ||
                        (orderTypeValueLower.indexOf("square") == -1 &&
                            orderTypeValueLower.indexOf("afterpay") == -1 &&
                            orderTypeValueLower.indexOf("paypalrest") == -1 &&
                            orderTypeValueLower.indexOf("affirm") == -1 &&
                            orderTypeValueLower.indexOf("paybright") == -1 &&
                            orderTypeValueLower.indexOf("paypal") == -1 &&
                            orderTypeValueLower.indexOf("klarna") == -1))
                ) {
                    if (isEmpty("CardNumber")) {
                        errorsObj.push({
                            message: errorMessages.creditCardNumberRequired,
                            element: $("#CardNumber")
                        });
                    } else {
                        switch (CheckCardNum($("#CardNumber").val())) {
                            case 0:
                                errorsObj.push({
                                    message:
                                        errorMessages.creditCardNumberInvalid,
                                    element: $("#CardNumber")
                                });
                                break;

                            case 2:
                                errorsObj.push({
                                    message: errorMessages.creditCardTypeJCB,
                                    element: $("#CardNumber")
                                });
                                break;

                            case 3:
                                errorsObj.push({
                                    message: errorMessages.creditCardTypeDC,
                                    element: $("#CardNumber")
                                });
                                break;
                        }

                        if (
                            $("#CardCvv2").val().length < 3 ||
                            isNaN($("#CardCvv2").val()) ||
                            isEmpty("CardCvv2") ||
                            isInvalidCVV($("#CardCvv2").val())
                        )
                            errorsObj.push({
                                message: errorMessages.CVV2Invalid,
                                element: $("#CardCvv2")
                            });
                    }

                    if ($("#CardExpirationMonth").length > 0) {
                        var month = $("#CardExpirationMonth").val();
                        var year = $("#CardExpirationYear").val();
                        if (!IsValidCreditCardDate(month, year))
                            errorsObj.push({
                                message:
                                    errorMessages.creditCardExpirationInvalid,
                                element: $("#CardExpirationYear")
                            });
                    }
                }

                if ($("#BillingPrefix").length > 0) {
                    if (isEmpty("BillingPrefix")) {
                        errorsObj.push({
                            message: errorMessages.titleRequired,
                            element: $("#BillingPrefix")
                        });
                    }
                }

                if ($("#BillingFirstName").length > 0) {
                    if (
                        (typeof verifyBFirstName == "undefined" ||
                            verifyBFirstName) &&
                        isEmpty("BillingFirstName")
                    )
                        errorsObj.push({
                            message: errorMessages.firstNameRequired,
                            element: $("#BillingFirstName")
                        });

                    if (
                        (typeof verifyBLastName == "undefined" ||
                            verifyBLastName) &&
                        isEmpty("BillingLastName")
                    )
                        errorsObj.push({
                            message: errorMessages.lastNameRequired,
                            element: $("#BillingLastName")
                        });

                    if (
                        $("#BillingFullName").length != 0 &&
                        (typeof verifyBFullName == "undefined" ||
                            verifyBFullName) &&
                        isEmpty("BillingFullName")
                    )
                        errorsObj.push({
                            message: errorMessages.billingNameRequired,
                            element: $("#BillingFullName")
                        });

                    if (
                        (typeof verifyBStreet == "undefined" ||
                            verifyBStreet) &&
                        isEmpty("BillingStreet")
                    )
                        errorsObj.push({
                            message: errorMessages.addressRequired,
                            element: $("#BillingStreet")
                        });

                    if (
                        (typeof verifyBCity == "undefined" || verifyBCity) &&
                        isEmpty("BillingCity")
                    )
                        errorsObj.push({
                            message: errorMessages.cityRequired,
                            element: $("#BillingCity")
                        });

                    if (
                        (typeof verifyBState == "undefined" || verifyBState) &&
                        isEmpty("BillingState") &&
                        $("#BillingCountry").val() != "GBR"
                    )
                        errorsObj.push({
                            message: errorMessages.stateRequired,
                            element: $("#BillingState")
                        });

                    if (
                        (typeof verifyBZip == "undefined" || verifyBZip) &&
                        isEmpty("BillingZip")
                    )
                        errorsObj.push({
                            message: errorMessages.zipRequired,
                            element: $("#BillingZip")
                        });

                    if (
                        (typeof verifyBCountry == "undefined" ||
                            verifyBCountry) &&
                        isEmpty("BillingCountry")
                    )
                        errorsObj.push({
                            message: errorMessages.countryRequired,
                            element: $("#BillingCountry")
                        });

                    if ($("#BillingCountry").length > 0) {
                        if (
                            document.getElementById("BillingCountry").value !=
                                isSingleBillingCountryValue &&
                            isSingleBillingCountry
                        ) {
                            document.getElementById("BillingCountry").value =
                                isSingleBillingCountryValue;
                        }
                    }
                } else if ($("#BillingFullName").length > 0) {
                    if (
                        $("#BillingFullName").length != 0 &&
                        (typeof verifyBFullName == "undefined" ||
                            verifyBFullName) &&
                        isEmpty("BillingFullName")
                    )
                        errorsObj.push({
                            message: errorMessages.billingNameRequired,
                            element: $("#BillingFullName")
                        });
                    if (
                        (typeof verifyBStreet == "undefined" ||
                            verifyBStreet) &&
                        isEmpty("BillingStreet")
                    )
                        errorsObj.push({
                            message: errorMessages.addressRequired,
                            element: $("#BillingStreet")
                        });
                    if (
                        (typeof verifyBCity == "undefined" || verifyBCity) &&
                        isEmpty("BillingCity")
                    )
                        errorsObj.push({
                            message: errorMessages.cityRequired,
                            element: $("#BillingCity")
                        });
                    if (
                        (typeof verifyBState == "undefined" || verifyBState) &&
                        isEmpty("BillingState") &&
                        $("#BillingCountry").val() != "GBR"
                    )
                        errorsObj.push({
                            message: errorMessages.stateRequired,
                            element: $("#BillingState")
                        });
                    if (
                        (typeof verifyBZip == "undefined" || verifyBZip) &&
                        isEmpty("BillingZip")
                    )
                        errorsObj.push({
                            message: errorMessages.zipRequired,
                            element: $("#BillingZip")
                        });
                    if (
                        (typeof verifyBCountry == "undefined" ||
                            verifyBCountry) &&
                        isEmpty("BillingCountry")
                    )
                        errorsObj.push({
                            message: errorMessages.countryRequired,
                            element: $("#BillingCountry")
                        });
                    if ($("#BillingCountry").length > 0) {
                        if (
                            document.getElementById("BillingCountry").value !=
                                isSingleBillingCountryValue &&
                            isSingleBillingCountry
                        ) {
                            document.getElementById("BillingCountry").value =
                                isSingleBillingCountryValue;
                        }
                    }
                } else if (
                    (typeof verifyBZip == "undefined" || verifyBZip) &&
                    isEmpty("BillingZip")
                )
                    errorsObj.push({
                        message: errorMessages.zipRequired,
                        element: $("#BillingZip")
                    });

                if (
                    (typeof verifyPhone == "undefined" || verifyPhone) &&
                    $("#Phone").length > 0
                ) {
                    if (isEmpty("Phone")) {
                        errorsObj.push({
                            message: errorMessages.phoneRequired,
                            element: $("#Phone")
                        });
                    } else {
                        var phone = $("#Phone")
                            .val()
                            .replace(/[^0-9]/g, "");
                        var isUnitedKingdomSite =
                            $("#BillingCountry").val() == "GBR";
                        if (!isUnitedKingdomSite) {
                            if (phone.length != 10) {
                                errorsObj.push({
                                    message: errorMessages.phoneInvalid,
                                    element: $("#Phone")
                                });
                            }
                        } else {
                            if (phone.length != 11) {
                                errorsObj.push({
                                    message: errorMessages.phoneInvalidUK,
                                    element: $("#Phone")
                                });
                            }
                        }
                    }
                }

                var emailaddress;
                if (
                    (typeof verifyEmail == "undefined" || verifyEmail) &&
                    $("#Email").length > 0
                ) {
                    if (isEmpty("Email")) {
                        errorsObj.push({
                            message: errorMessages.emailRequired,
                            element: $("#Email")
                        });
                    } else {
                        var reg =
                            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        emailaddress = document.getElementById("Email").value;

                        if (reg.test(emailaddress) == false) {
                            errorsObj.push({
                                message: errorMessages.emailInvalid,
                                element: $("#Email")
                            });
                        }
                    }
                }

                if ($("#ShippingFirstName").length > 0 && ischeckedss()) {
                    if (
                        (typeof verifySFirstName == "undefined" ||
                            verifySFirstName) &&
                        isEmpty("ShippingFirstName")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingfirstNameRequired,
                            element: $("#ShippingFirstName")
                        });

                    if (
                        (typeof verifySLastName == "undefined" ||
                            verifySLastName) &&
                        isEmpty("ShippingLastName")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingLastNameRequired,
                            element: $("#ShippingLastName")
                        });

                    if (
                        $("#ShippingFullName").length != 0 &&
                        (typeof verifySFullName == "undefined" ||
                            verifySFullName) &&
                        isEmpty("ShippingFullName")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingNameRequired,
                            element: $("#ShippingFullName")
                        });

                    if (
                        (typeof verifySStreet == "undefined" ||
                            verifySStreet) &&
                        isEmpty("ShippingStreet")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingAddressRequired,
                            element: $("#ShippingStreet")
                        });

                    if (
                        (typeof verifySCity == "undefined" || verifySCity) &&
                        isEmpty("ShippingCity")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingCityRequired,
                            element: $("#ShippingCity")
                        });

                    if (
                        (typeof verifySState == "undefined" || verifySState) &&
                        isEmpty("ShippingState")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingStateRequired,
                            element: $("#ShippingState")
                        });

                    if (
                        (typeof verifySZip == "undefined" || verifySZip) &&
                        isEmpty("ShippingZip")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingZipRequired,
                            element: $("#ShippingZip")
                        });

                    if (
                        (typeof verifySCountry == "undefined" ||
                            verifySCountry) &&
                        isEmpty("ShippingCountry")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingCountryRequired,
                            element: $("#ShippingCountry")
                        });
                } else if ($("#ShippingFullName").length > 0 && ischeckedss()) {
                    if (
                        $("#ShippingFullName").length != 0 &&
                        (typeof verifySFullName == "undefined" ||
                            verifySFullName) &&
                        isEmpty("ShippingFullName")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingNameRequired,
                            element: $("#ShippingFullName")
                        });
                    if (
                        (typeof verifySStreet == "undefined" ||
                            verifySStreet) &&
                        isEmpty("ShippingStreet")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingAddressRequired,
                            element: $("#ShippingStreet")
                        });
                    if (
                        (typeof verifySCity == "undefined" || verifySCity) &&
                        isEmpty("ShippingCity")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingCityRequired,
                            element: $("#ShippingCity")
                        });
                    if (
                        (typeof verifySState == "undefined" || verifySState) &&
                        isEmpty("ShippingState")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingStateRequired,
                            element: $("#ShippingState")
                        });
                    if (
                        (typeof verifySZip == "undefined" || verifySZip) &&
                        isEmpty("ShippingZip")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingZipRequired,
                            element: $("#ShippingZip")
                        });
                    if (
                        (typeof verifySCountry == "undefined" ||
                            verifySCountry) &&
                        isEmpty("ShippingCountry")
                    )
                        errorsObj.push({
                            message: errorMessages.shippingCountryRequired,
                            element: $("#ShippingCountry")
                        });
                }

                if (!$("#ShippingIsDifferentThanBilling").is(":checked")) {
                    $("[name^=Shipping]")
                        .not(
                            "[name=ShippingIsDifferentThanBilling], #ShippingState, #ShippingCountry"
                        )
                        .each(function (index, item) {
                            if ($(item).attr("type") !== "hidden") {
                                $("#" + item.id + "").val("");
                            }
                        });
                }

                if (typeof onFormPostValidation == "function") {
                    var hasErrors = errorsObj.length > 0;
                    var postValidationMessages = onFormPostValidation(
                        e,
                        hasErrors
                    );
                    if (
                        postValidationMessages != null &&
                        postValidationMessages.length > 0
                    ) {
                        for (
                            var k = 0;
                            k < postValidationMessages.length;
                            k++
                        ) {
                            let postErrMessage = postValidationMessages[k]
                                .message
                                ? postValidationMessages[k].message
                                : postValidationMessages[k];

                            errorsObj.push({
                                message: postErrMessage,
                                element: postValidationMessages[k].element
                            });
                        }
                    }
                }

                if (
                    typeof doubleOfferWarning === "function" &&
                    errorsObj.length == 0 &&
                    e.type === "click"
                ) {
                    let warning = doubleOfferWarning();
                    if (typeof warning !== "undefined" && warning !== null) {
                        errorsObj.push({
                            message: warning,
                            element: null
                        });
                    }
                }
            } catch (err) {
                alert(err);
                e.preventDefault();
                _ValidationRunning = false;
            }

            try {
                if (errorsObj.length == 0) {
                    _ValidationRunning = false;
                    cleanExit = true;

                    if (returnIsValid) {
                        return true;
                    }
                    if (returnErrorObj) {
                        return [];
                    }
                }
                if (errorsObj.length > 0) {
                    if (returnErrorObj) {
                        _ValidationRunning = false;
                        let finalObj = errorsObj;
                        errorsObj = [];

                        //user validator in validation.js to show errors
                        if (typeof validator !== "undefined") {
                            $.each(finalObj, function (idx, ele) {
                                validator.showError(ele);
                            });
                        }
                        return finalObj;
                    }
                    e.preventDefault();

                    var finalMessages = "";
                    $.each(errorsObj, function (idx, ele) {
                        finalMessages += "\t" + ele.message + "\n";
                    });
                    finalMessages =
                        errorMessages.validationHeader + "\n" + finalMessages;
                    _ValidationRunning = false;

                    alert(finalMessages);
                    errorsObj = [];
                    if (returnIsValid) {
                        return false;
                    }
                } else {
                }
            } catch (err) {}
        } else {
            _ValidationRunning = false;
            if (returnIsValid) {
                return true;
            }
            if (returnErrorObj) {
                _ValidationRunning = false;
                let finalObj = errorsObj;
                errorsObj = [];
                return finalObj;
            }
        }
    } else {
        e.preventDefault();
        console.log("Validation Running");
        return false;
    }
}

registerEvent("handleErrorValidationMapping", function (e) {
    let useAdaErrors =
        typeof _AdaErrors === "undefined" || !_AdaErrors ? false : _AdaErrors;
    if (useAdaErrors) {
        $("[id$='_backToError']").remove();
        let errors = e.detail;
        let firstError;

        for (var i = 0; i < errors.length; i++) {
            let element = errors[i].element;
            let message = errors[i].message;
            let errorsLi = $(".vse").find("li");

            for (var j = 0; j < errorsLi.length; j++) {
                var vseMessage = errorsLi[j].innerText;

                if (message == vseMessage) {
                    var elementExists =
                        typeof $(element) != "undefined" &&
                        $(element).length > 0;

                    if (elementExists) {
                        var id = $(element).attr("id");
                        var errorId = id + "_error";
                        var link = $("<a></a>", {
                            href: "#" + id,
                            id: errorId,
                            "aria-label":
                                message +
                                ". This link will take you to correct the field."
                        });

                        link.text(message);

                        if (j === 0) {
                            firstError = errorId;
                        }
                        //create link inside next to field
                        var s_errorId = "#" + id + "_error";

                        if ($("#" + id + "_backToError").length == 0) {
                            var backToError = $("<a></a>", {
                                href: s_errorId,
                                id: id + "_backToError",

                                "aria-label": "return to error message"
                            })
                                .html("Return to error message")
                                .wrap(
                                    $("<div/>", {
                                        class: "backToError c-brand--form__error-link"
                                    })
                                )
                                .parent();

                            $(element).parents("li").append(backToError);
                        }

                        $(errorsLi[j]).html(link);

                        break;
                    }
                }
            }
        }

        $("#" + firstError).focus();
        errorsObj = [];
    }
});

function onEmailValidateComplete() {
    _ValidationRunning = false;
    EmailValidate = false;
    if (typeof validateFormOverride == "function") {
        $('[name="acceptOffer"]').unbind("click", validateFormOverride);
    } else {
        $('[name="acceptOffer"]').unbind("click", validateForm);
    }
    try {
        $.fancybox.close();
    } catch (error) {}
    $('[name="acceptOffer"]').trigger("click");
}

function isEmpty(fieldId) {
    var value = $("#" + fieldId).val();
    if (value == null) return true;
    var str = value.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    return str.length == 0;
}

function isInvalidCVV(cvv) {
    var hasCardType =
        $("#CardType").length > 0 && $("#CardType").val().length > 0;

    if (hasCardType) {
        var cvvLength = cvv.length;

        switch ($("#CardType").val().toLowerCase()) {
            case "v":
            case "m":
            case "d":
                if (cvvLength == 3) {
                    return false;
                } else {
                    return true;
                }

                break;
            case "ax":
                if (cvvLength == 4) {
                    return false;
                } else {
                    return true;
                }
                break;
            default:
                return false;
                break;
        }
    }
}

var errorcolor = "#FCFCC2";
var normalcolor = "#FFFFFF";
var errormessage = "";

function CheckCardNum(cardnum) {
    if (cardnum == "") {
        return 0;
    }
    if (isNaN(cardnum)) {
        return 0;
    }
    if (parseInt(cardnum) <= 0) {
        return 0;
    }
    if (!CheckLUHN(cardnum)) {
        return 0;
    }

    //Checks card length based of card type
    var regex = new RegExp(
        "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$"
    );
    if (!regex.test(cardnum)) {
        return 0; //Returning 0 = Visa, Master Card, Amex, Discover but with invalid number
    }
    if (/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/.test(cardnum)) {
        return 2; //Returning 2 = JCB card which is not accepted
    }
    if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cardnum)) {
        return 3; //Returning 3 = Diners Club card which is not accepted
    }
    return 1; //Returning 1 = Card is valid
}

function CheckLUHN(cardnum) {
    var revNum = new String(cardnum);
    revNum = Reverse(revNum);

    var total = new Number(0);
    for (var i = 0; i < revNum.length; i += 1) {
        var temp = 0;
        if (i % 2) {
            temp = revNum.substr(i, 1) * 2;
            if (temp >= 10) {
                var splitstring = new String(temp);
                temp =
                    parseInt(splitstring.substr(0, 1)) +
                    parseInt(splitstring.substr(1, 1));
            }
        } else {
            temp = revNum.substr(i, 1);
        }
        total += parseInt(temp);
    }
    // if there's no remainder, we return 1 (true)
    return total % 10 ? 0 : 1;
}

function IsValidCreditCardDate(cardExpirationMonth, cardExpirationYear) {
    var currentDate = new Date();

    if (
        cardExpirationYear == currentDate.getFullYear() &&
        cardExpirationMonth - 1 < currentDate.getMonth()
    ) {
        return false;
    }
    return true;
}

function Reverse(strToReverse) {
    var strRev = new String();
    var i = strToReverse.length;

    while (i--) {
        strRev += strToReverse.charAt(i);
    }
    return strRev;
}

function validate_email() {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = document.getElementById("email_address").value;
    if (reg.test(address) == false) {
        return false;
    }
    return true;
}

function trimOrderFields() {
    $("#CardNumber").val($.trim($("#CardNumber").val()));
    $("#CardCvv2").val($.trim($("#CardCvv2").val()));
    $("#BillingZip").val($.trim($("#BillingZip").val()));
}

function validateCheckOutForm(e) {
    if (
        typeof $("input[name=OrderType]:checked").val() === "undefined" ||
        $("input[name=OrderType]:checked").val() == ""
    ) {
        var messages = "";
        try {
            trimOrderFields();
            var isContinueCCCheck = true;

            isContinueCCCheck =
                $("input[name='CardSelection']:checked").val() == undefined;
            if (!isContinueCCCheck)
                isContinueCCCheck =
                    $("input[name='CardSelection']:checked").val().length == 0;
            if (
                isContinueCCCheck &&
                $("#CardNumber").length > 0 &&
                ($("#ValidateCardInfo").length == 0 ||
                    !$("#ValidateCardInfo").attr("checked"))
            ) {
                if (isEmpty("CardNumber")) {
                    messages +=
                        "\t" + errorMessages.creditCardNumberRequired + "\n";
                } else {
                    switch (CheckCardNum($("#CardNumber").val())) {
                        case 0:
                            messages +=
                                "\t" +
                                errorMessages.creditCardNumberInvalid +
                                "\n";
                            break;

                        case 2:
                            messages +=
                                "\t" + errorMessages.creditCardTypeJCB + "\n";
                            break;

                        case 3:
                            messages +=
                                "\t" + errorMessages.creditCardTypeDC + "\n";
                            break;
                    }
                }
                if ($("#CardExpirationMonth").length > 0) {
                    var month = $("#CardExpirationMonth").val();
                    var year = $("#CardExpirationYear").val();

                    if (!IsValidCreditCardDate(month, year))
                        messages +=
                            "\t" +
                            errorMessages.creditCardExpirationInvalid +
                            "\n";
                }
            }

            if (
                $("#CardCvv2").val().length < 3 ||
                isNaN($("#CardCvv2").val()) ||
                isEmpty("CardCvv2")
            )
                messages += "\t" + errorMessages.CVV2Invalid + "\n";

            if ($("#BillingFirstName").length > 0) {
                if (isEmpty("BillingFirstName"))
                    messages += "\t" + errorMessages.firstNameRequired + "\n";

                if (isEmpty("BillingLastName"))
                    messages += "\t" + errorMessages.lastNameRequired + "\n";

                if (document.getElementById("BillingStreet").value.length == 0)
                    messages += "\t" + errorMessages.addressRequired + "\n";

                if (document.getElementById("BillingCity").value.length == 0)
                    messages += "\t" + errorMessages.cityRequired + "\n";

                if (document.getElementById("BillingState").value.length == 0)
                    messages += "\t" + errorMessages.stateRequired + "\n";

                if (document.getElementById("BillingZip").value.length == 0)
                    messages += "\t" + errorMessages.zipRequired + "\n";

                if (document.getElementById("BillingCountry").value.length == 0)
                    messages += "\t" + errorMessages.countryRequired + "\n";

                if (
                    document.getElementById("BillingCountry").value !=
                        isSingleBillingCountryValue &&
                    isSingleBillingCountry
                )
                    document.getElementById("BillingCountry").value =
                        isSingleBillingCountryValue;
            }

            if ($("#Phone").length > 0) {
                if (isEmpty("Phone")) {
                    messages += "\t" + errorMessages.phoneRequired + "\n";
                }

                if (!isEmpty("Phone")) {
                    phone = $("#Phone")
                        .val()
                        .replace(/[^0-9]/g, "");
                    if (!isUnitedKingdomSite) {
                        if (phone.length != 10) {
                            messages +=
                                "\t" + errorMessages.phoneInvalid + "\n";
                        }
                    } else {
                        if (phone.length != 11) {
                            messages +=
                                "\t" + errorMessages.phoneInvalidUK + "\n";
                        }
                    }
                }
            }

            if ($("#Email").length > 0) {
                if (isEmpty("Email")) {
                    messages += "\t" + errorMessages.emailRequired + "\n";
                } else {
                    var reg =
                        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    var address = document.getElementById("Email").value;

                    if (reg.test(address) == false) {
                        messages += "\t" + errorMessages.emailInvalid + "\n";
                    }
                }
            }

            if (
                typeof isLoggedIn != "undefined" &&
                !isLoggedIn &&
                ($("input[name='LoginSelection']:checked").val() == undefined ||
                    $("input[name='LoginSelection']:checked").val() !=
                        "anonymous")
            ) {
                if (isEmpty("CurrentCustomer_Password"))
                    messages += "\t" + errorMessages.passwordRequired + "\n";

                if (isEmpty("ConfirmPassword"))
                    messages +=
                        "\t" + errorMessages.confirmPasswordRequired + "\n";

                if (
                    $("#CurrentCustomer_Password").val() !=
                    $("#ConfirmPassword").val()
                )
                    messages += "\t" + errorMessages.passwordMismatch + "\n";
            }

            if (ischeckedss()) {
                if (document.getElementById("ShippingStreet").value.length == 0)
                    messages +=
                        "\t" + errorMessages.shippingAddressRequired + "\n";

                if (document.getElementById("ShippingCity").value.length == 0)
                    messages +=
                        "\t" + errorMessages.shippingCityPlaceholder + "\n";

                if (document.getElementById("ShippingState").value.length == 0)
                    messages +=
                        "\t" + errorMessages.shippingStateRequired + "\n";

                if (document.getElementById("ShippingZip").value.length == 0)
                    messages += "\t" + errorMessages.shippingZipRequired + "\n";

                if (
                    document.getElementById("ShippingCountry").value.length == 0
                )
                    messages +=
                        "\t" + errorMessages.shippingCountryRequired + "\n";

                if (
                    document.getElementById("ShippingCountry").value !=
                        isSingleShippingCountryValue &&
                    isSingleShippingCountry
                )
                    document.getElementById("ShippingCountry").value =
                        isSingleShippingCountryValue;
            }
        } catch (err) {
            alert(err);
            e.preventDefault();
            _ValidationRunning = false;
        }
        if (messages.length > 0) {
            e.preventDefault();
            messages = errorMessages.validationHeader + "\n" + messages;
            alert(messages);
            _ValidationRunning = false;
        }
    } else {
        _ValidationRunning = false;
    }
}

$(document).ready(function () {
    // get billing country
    var BillingCountry = $("#BillingCountry");
    // get shipping country
    var ShippingCountry = $("#ShippingCountry");
    // get billing zip code
    var BillingZip = $("#BillingZip, #zc");
    // get shipping zip code
    var ShippingZip = $("#ShippingZip");

    var length = 1;

    $("#BillingCountry option").each(function () {
        if (this.text == "Choose Country" || this.value == "") {
            length = 2;
        }
    });

    if ($("#formWrap").length != 0) {
        $("#formWrap")
            .find("input")
            .each(function () {
                $(this).val(
                    $(this)
                        .val()
                        .replace(/^\*(\w*\s*)+/g, "")
                );
            });
    }

    if (
        $("#BillingCountry").length != 0 &&
        $("#BillingCountry option").length == length
    ) {
        var billingValue = $("#BillingCountry option:last").val();
        var billingParent = $("#BillingCountry").parent();
        billingParent.hide();
        billingParent
            .closest("form")
            .append(
                '<input type="hidden" id="BillingCountry" name="BillingCountry" value="' +
                    billingValue +
                    '"/>'
            );
        isSingleBillingCountry = true;
        isSingleBillingCountryValue = billingValue;
        $("#BillingCountry").remove();
        $("#BillingCountryCt").remove();
    }

    if (
        $("#ShippingCountry").length != 0 &&
        $("#ShippingCountry option").length == length
    ) {
        var shippingValue = $("#ShippingCountry option:last").val();
        var shippingParent = $("#ShippingCountry").parent();
        shippingParent
            .closest("form")
            .append(
                '<input type="hidden" id="ShippingCountry" name="ShippingCountry" value="' +
                    shippingValue +
                    '"/>'
            );
        shippingParent.hide();
        isSingleShippingCountry = true;
        isSingleShippingCountryValue = shippingValue;
        $("#ShippingCountry").remove();
        $("#ShippingCountryCt").remove();
    }

    $("#BillingCountry").bind("change", updateZipByCountry);
    $("#ShippingCountry").bind("change", updateZipByCountry);

    if (
        (typeof verifyPhone == "undefined" || verifyPhone) &&
        $("#Phone").length > 0 &&
        typeof $("#BillingCountry") != "undefined" &&
        $("#BillingCountry").val() != "GBR"
    ) {
        $("#Phone").on("input", function () {
            var val = $(this).val() || "";
            var items = val
                .replace(/[^0-9]/gi, "")
                .match(/^([0-9]{3})?([0-9]{3})?([0-9]+)$/);
            var newVal = "";
            if (items) {
                items.splice(0, 1);
                for (var i = 0; i < items.length; i++) {
                    if (typeof items[i] == "undefined") {
                        items.splice(i, 1);
                        i--;
                    } else {
                        items[i] = items[i].substr(0, 4);
                    }
                }
                newVal = items.join("-");
            }
            $(this).val(newVal);
        });
    }

    checkVSCookie();
});

function loadCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function registerEvent(evType, fn, element, useCapture) {
    var elm = element || window;
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture || false);
    } else if (elm.attachEvent) {
        var r = elm.attachEvent(evType, fn);
    } else {
        elm[evType] = fn;
    }
}

function triggerEvent(eventName, data, element) {
    try {
        var event;
        var payload =
            data && typeof data.detail != "undefined"
                ? data
                : data
                ? { detail: data }
                : { detail: "" };
        if (typeof window.CustomEvent === "function") {
            event = new CustomEvent(eventName, payload || { detail: "" });
        } else if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.detail = payload.detail;
            event.initEvent(eventName, true, true);
        } else if (document.createEventObject) {
            event = document.createEventObject();
            event.detail = payload.detail;
            event.eventType = eventName;
        }
        event.eventName = eventName;
        var el = element || window;
        if (el.dispatchEvent) {
            el.dispatchEvent(event);
        } else if (el.fireEvent && htmlEvents[eventName]) {
            el.fireEvent(event.eventType, event);
        } else if (el[eventName]) {
            el[eventName]();
        } else if (el["on" + eventName]) {
            el["on" + eventName]();
        }
    } catch (error) {
        console.log("Error executing " + name + " Event");
    }
}

function checkVSCookie() {
    if (loadCookie("visitorSession") === "") {
        setTimeout("checkVSCookie()", 250);
    } else {
        if (typeof OnVSCookieLoaded == "function") {
            OnVSCookieLoaded();
        }
        triggerEvent("SessionLoaded", { detail: "" });
        /*setupFingerprint();*/
    }
}

var messagesEnglish = {
    billingStreetAutofillPlaceholder: "Street Address",
    billingNameOnCardLabel: "Full Name",
    billingNameOnCardPlaceholder: "*Full Name:",
    billingStreetPlaceholder: "*Address:",
    billingCityPlaceholder: "*City:",
    billingZipPlaceholder: "*Zip:",
    phonePlaceholder: "*Phone:",
    emailPlaceholder: "*Email:",
    shippingStreetAutofillPlaceholder: "Street Address",
    shippingNameOnCardLabel: "Full Name",
    shippingNameOnCardPlaceholder: "*Full Name:",
    shippingStreetPlaceholder: "*Address:",
    shippingCityPlaceholder: "*City:",
    shippingZipPlaceholder: "*Zip:"
};

var messagesFrench = {
    billingStreetAutofillPlaceholder: "Adresse de la rue",
    billingNameOnCardLabel: "Nom et prénom",
    billingNameOnCardPlaceholder: "*Nom et prénom:",
    billingStreetPlaceholder: "*Adresse:",
    billingCityPlaceholder: "*Ville:",
    billingZipPlaceholder: "*Le code postal:",
    phonePlaceholder: "*Numéro de téléphone:",
    emailPlaceholder: "*Email:",
    shippingStreetAutofillPlaceholder: "Adresse de la rue",
    shippingNameOnCardLabel: "Nom et prénom",
    shippingNameOnCardPlaceholder: "*Nom et prénom:",
    shippingStreetPlaceholder: "*Adresse:",
    shippingCityPlaceholder: "*Ville:",
    shippingZipPlaceholder: "*Le code postal:"
};

$(window).ready(function () {
    $("img[height=1]").each(function (i, item) {
        $(item).hide();
    });

    if ($("#upsellTxt .Quantity").length == 1) {
        $("#upsellTxt .Quantity").each(function (i, item) {
            $(item).removeClass("Quantity");
        });
    }

    try {
        function verifyCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(";");
            var results = [];
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    results[results.length] = c.substring(
                        name.length,
                        c.length
                    );
                }
            }
            if (results.length > 1) {
                var removeItem = function (sKey, sPath, sDomain) {
                    console.log(
                        "More than 1 cookie detected, deleteing: ",
                        sKey,
                        sPath,
                        sDomain
                    );
                    document.cookie =
                        encodeURIComponent(sKey) +
                        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                        (sDomain ? "; domain=" + sDomain : "") +
                        (sPath ? "; path=" + sPath : "");
                };
                removeItem(cname, "/", window.location.hostname);
                removeItem(cname, "/", "");
            }
            return results.length;
        }
        verifyCookie("visitorSession");
    } catch (error) {}

    // Verify each Option has a Value attribute set to prevent MS Edge from injecting invalid characters
    var populateOptionValues = function (existingSelects) {
        var selects =
            existingSelects || document.getElementsByTagName("select");
        for (var i = 0; i < selects.length; i++) {
            var select = selects[i];
            for (var j = 0; j < select.options.length; j++) {
                var option = select.options[j];
                if (!option.getAttribute("value")) {
                    if (
                        (option.innerText || "")
                            .toLowerCase()
                            .indexOf("choose") >= 0 ||
                        (option.innerText || "")
                            .toLowerCase()
                            .indexOf("estado") >= 0 ||
                        (option.innerText || "")
                            .toLowerCase()
                            .indexOf("choisi") >= 0 ||
                        (option.innerText || "")
                            .toLowerCase()
                            .indexOf("select") >= 0 ||
                        (option.innerText || "")
                            .toLowerCase()
                            .indexOf("out of stock") >= 0
                    ) {
                        option.setAttribute("value", "");
                    } else {
                        option.setAttribute("value", option.innerText);
                    }
                }
            }
        }
    };
    populateOptionValues();
    $(document).on("DOMNodeInsertedIntoDocument DOMNodeInserted", function (e) {
        if ($(e.target).is("select")) {
            populateOptionValues([e.target]);
        }

        if (
            $("#CardNumber").length > 0 &&
            $("#CardNumber").attr("autocomplete") !== "cc-number"
        ) {
            $("#CardNumber").attr("autocomplete", "cc-number");
        }
    });
});

window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};
