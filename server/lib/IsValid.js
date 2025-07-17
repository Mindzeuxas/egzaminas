/**
 * ```
 * username(text)
 * email(text)
 * password(text)
 * id(number)
 * nonEmptyString(text)
 * urlSlug(text)
 * includesInList(value, allowedValues)
 * positiveInteger(number)
 * idAsString(text)
 * ```
 */
export class IsValid {
  /**
   *
   * @param {Object} clientData Is kliento gautas isparsintas JSON objektas
   * @param {Object[]} requiredFields Privalomu lauku validavimo taisykles
   * @param {Object[]} optionalFields Privalomu lauku validavimo taisykles
   * @param {string} requiredFields[].field Privalomo lauko pavadinimas
   * @param {Function} requiredFields[].validation Privalomo lauko reiksme validuojanti funkcija / statinis metodas
   * @param {string} optionalFields[].field Neprivalomo lauko pavadinimas
   * @param {Function} optionalFields[].validation Neprivalomo lauko reiksme validuojanti funkcija / statinis metodas
   * @returns
   */
  static requiredFields(clientData, requiredFields, optionalFields = []) {
    if (typeof clientData !== "object" || Array.isArray(clientData) || clientData === null) {
      return [true, "Reikalingas validus objektas"];
    }

    // ar turim visus privalomus laukus?
    for (const { field } of requiredFields) {
      if (!(field in clientData)) {
        const names = requiredFields.map((obj) => obj.field).join(", ");
        return [true, "Reikalingi laukai yra: " + names];
      }
    }

    // ar nera neleistinu lauku?
    const totalAvailableKeys = [];
    for (const { field } of requiredFields) {
      totalAvailableKeys.push(field);
    }
    for (const { field } of optionalFields) {
      totalAvailableKeys.push(field);
    }

    const clientKeys = Object.keys(clientData);

    for (const key of clientKeys) {
      if (!totalAvailableKeys.includes(key)) {
        return [true, "Rastas neleistinas raktas: " + key];
      }
    }

    const errors = {};

    // duomenu validavimas
    for (const { field, validation, options } of requiredFields) {
      const [err, msg] = validation(clientData[field], options);

      if (err) {
        errors[field] = msg;
      }
    }

    for (const { field, validation, options } of optionalFields) {
      if (field in clientData) {
        const [err, msg] = validation(clientData[field], options);

        if (err) {
          errors[field] = msg;
        }
      }
    }

    if (Object.keys(errors).length) {
      return [true, errors];
    }

    return [false, "Ok"];
  }

  /**
   * Slapyvardzio validavimas.
   * @param {string} text Slapyvardis
   * @returns {[true, string] | [false, 'Ok']}
   */
  static username(text) {
    const minSize = 3;
    const maxSize = 30;

    if (typeof text !== "string") {
      return [true, "Slapyvardis turi buti teksto tipo."];
    }

    if (text.length < minSize) {
      return [true, `Slapyvardis turi buti ne trumpesnis nei ${minSize} simboliu.`];
    }

    if (text.length > maxSize) {
      return [true, `Slapyvardis turi buti ne ilgesnis nei ${maxSize} simboliu.`];
    }

    // TODO: aprasyti daugiau taisykliu

    return [false, "Ok"];
  }

  /**
   * El. pasto adreso validavimas.
   * @param {string} text El. pasto adresas
   * @returns {[true, string] | [false, 'Ok']}
   */
  static email(text) {
    const minSize = 6;
    const maxSize = 50;
    const localPartMaxSize = 64;
    const domainPartMaxSize = 255;
    const domainSubPartMaxSize = 63;
    const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.";
    const allowedLocalPartSymbols = abc + "_";
    const allowedDomainPartSymbols = abc;

    if (typeof text !== "string") {
      return [true, "El. pastas turi buti teksto tipo."];
    }

    if (text.length < minSize) {
      return [true, `El. pastas turi buti ne trumpesnis nei ${minSize} simboliu.`];
    }

    if (text.length > maxSize) {
      return [true, `El. pastas turi buti ne ilgesnis nei ${maxSize} simboliu.`];
    }

    if (text.includes("..")) {
      return [true, `El. pastas negali tureti dvieju is eiles einanciu tasku.`];
    }

    const parts = text.split("@");

    if (parts.length < 2) {
      return [true, `El. pastas turi tureti viena "@" simboli.`];
    }

    if (parts.length > 2) {
      return [true, `El. pastas turi tureti tik viena "@" simboli.`];
    }

    const [localPart, domainPart] = parts;

    if (localPart.length > localPartMaxSize) {
      return [true, `El. pasto dalis prie "@" simboli negali virsyti ${localPartMaxSize} simboliu.`];
    }

    if (domainPart.length > domainPartMaxSize) {
      return [true, `El. pasto dalis uz "@" simbolio negali virsyti ${domainPartMaxSize} simboliu.`];
    }

    if (domainPart.includes("_")) {
      return [true, `El. pasto dalis uz "@" simbolio negali tureti "_" simbolio.`];
    }

    for (const s of localPart) {
      if (!allowedLocalPartSymbols.includes(s)) {
        return [true, `El. pasto dalis pries "@" simboli negali tureti "${s}" simbolio.`];
      }
    }

    for (const s of domainPart) {
      if (!allowedDomainPartSymbols.includes(s)) {
        return [true, `El. pasto dalis uz "@" simbolio negali tureti "${s}" simbolio.`];
      }
    }

    const domainSubParts = domainPart.split(".");

    if (domainSubParts.length < 2) {
      return [true, `El. pasto dalis uz "@" simbolio nepanasi i tikro el. pasto tiekejo adresa.`];
    }

    for (const part of domainSubParts) {
      if (part.length > domainSubPartMaxSize) {
        return [
          true,
          `El. pasto dalyje uz "@" simbolio tarp tasku esancios dalys negali virsyti ${domainSubPartMaxSize} simboliu kiekio.`,
        ];
      }
    }

    if (domainSubParts.at(-1).length < 2) {
      return [true, "Per trumpas TLD"];
    }

    return [false, "Ok"];
  }

  /**
   * Slaptazodzio validavimas.
   * @param {string} text Slaptazodis
   * @returns {[true, string] | [false, 'Ok']}
   */
  static password(text) {
    const minSize = 12;
    const maxSize = 100;

    if (typeof text !== "string") {
      return [true, "Slaptazodis turi buti teksto tipo."];
    }

    if (text.length < minSize) {
      return [true, `Slaptazodis turi buti ne trumpesnis nei ${minSize} simboliu.`];
    }

    if (text.length > maxSize) {
      return [true, `Slaptazodis turi buti ne ilgesnis nei ${maxSize} simboliu.`];
    }

    return [false, "Ok"];
  }

  static id(number) {
    if (typeof number !== "number" || !Number.isInteger(number) || number < 1 || number > Number.MAX_SAFE_INTEGER) {
      return [true, "ID turi buti teigiamas sveikasis skaiciaus."];
    }

    return [false, "Ok"];
  }

  static nonEmptyString(text) {
    text = text.trim();

    if (typeof text !== "string" || text === "") {
      return [true, "Turi buti ne tuscias tekstas."];
    }

    return [false, "Ok"];
  }

  static urlSlug(text) {
    if (typeof text !== "string" || text === "") {
      return [true, "Turi buti ne tuscias tekstas."];
    }

    const allowedSymbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
    const errors = [];

    for (const s of text) {
      if (!allowedSymbols.includes(s) && !errors.includes(`"${s}"`)) {
        errors.push(`"${s}"`);
      }
    }

    if (errors.length) {
      return [true, `Rasti neleistini simboliai: ${errors.join(", ")}.`];
    }

    return [false, "Ok"];
  }

  static includesInList(value, allowedValues) {
    if (!allowedValues.includes(value)) {
      return [true, `Turi buti viena is leistinu reiksmiu: ${allowedValues.join(", ")}.`];
    }

    return [false, "Ok"];
  }

  static positiveInteger(number) {
    if (typeof number !== "number" || !Number.isInteger(number)) {
      return [true, "Reikalingas sveikasis skaicius"];
    }

    if (number < 0) {
      return [true, "Reikalingas teigiamas sveikasis skaicius"];
    }

    return [false, "Ok"];
  }

  static idAsString(text) {
    const number = +text;

    if (!Number.isInteger(number) || number < 1 || number > Number.MAX_SAFE_INTEGER) {
      return [true, "ID turi buti teigiamas sveikasis skaiciaus."];
    }

    return [false, "Ok"];
  }
}
