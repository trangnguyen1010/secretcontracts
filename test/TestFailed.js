const PatientManagement = artifacts.require("PatientManagement");

contract('Patient management', async (accounts) => {
    var pm;
    var owner = accounts[0]
    var acc0 = accounts[0]
    var acc1 = accounts[1]
    before(async () => {
        pm = await PatientManagement.new();
    });

    
    it("Should not succeed to add new patient", async () => {
        name = "John Mc"
        dob = Math.floor(new Date("1990 March 22").getTime() / 1000)
        gender = 1; //1:Male, 2: Female, 3: Other
        homeAddress = "12L Green Boulevard";
        emailAddress = "job.mc@gmail.com";
        occupation = "architect";
        emergencyContact = "David Mc";
        var tx = await pm.addNewPatient(
            name,
            dob,
            homeAddress,
            emailAddress,
            gender,
            occupation,
            emergencyContact
        )
        assert(tx.logs.length, "Must emit event")
        var log = tx.logs[0]
        assert.equal(log.event, "NewPatient", "NewPatient event must be fired");
    })

    it("Should not succeed to update name (not owner)", async () => {
        newName = "David"
        id = 1
        try {
            var tx = await pm.updateName(id, newName, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update name (invalid id)", async () => {
        newName = "David"
        id = 10
        try {
            var tx = await pm.updateName(id, newName, {from: acc0});
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update dob (owner)", async () => {
        newDOB = 999999
        id = 1
        try {
            var tx = await pm.updateDOB(id, newDOB, {from: acc1} );
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update dob (id)", async () => {
        newDOB = 999999
        id = 11
        try {
            var tx = await pm.updateDOB(id, newDOB);
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update address", async () => {
        newAddress = "193 David"
        id = 1
        try {
            var tx = await pm.updateAddress(id, newAddress, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update address (invalid id)", async () => {
        newAddress = "193 David"
        id = 11
        try {
            var tx = await pm.updateAddress(id, newAddress);
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update email", async () => {
        newEmail = "david@hotmail.com"
        id = 1
        try {
            var tx = await pm.updateEmail(id, newEmail, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update email (invalid id)", async () => {
        newEmail = "david@hotmail.com"
        id = 11
        try {
            var tx = await pm.updateEmail(id, newEmail);
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update gender", async () => {
        newGender = 3
        id = 1
        try {
            var tx = await pm.updateGender(id, newGender, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update gender (invalid id)", async () => {
        newGender = 3
        id = 11
        try {
            var tx = await pm.updateGender(id, newGender);
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update occupation", async () => {
        newOccupation = "New occupation"
        id = 1
        try {
            var tx = await pm.updateOccupation(id, newOccupation, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update occupation (invalid id)", async () => {
        newOccupation = "New occupation"
        id = 11
        try {

            var tx = await pm.updateOccupation(id, newOccupation);
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update EmergencyContact", async () => {
        newContact = "New contact"
        id = 1
        try {
            var tx = await pm.updateEmergencyContact(id, newContact, {from: acc1});
        }catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update EmergencyContact (invalid id)", async () => {
        newContact = "New contact"
        id = 11
        try {
            var tx = await pm.updateEmergencyContact(id, newContact);
        }catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    /**
     * https://www.devglan.com/online-tools/aes-encryption-decryption
     * text = 1
     * mode = ECB
     * key size = 128
     * key = 1234567890123456
     * ouput = hex
     */
    it("Should not succeed to update phone", async () => {
        newPhone = Buffer.from("7971F5843BB00D0F8C94799EE771471011", "hex")
        id = 1
        try {
            var tx = await pm.updatePhone(id, newPhone, {from: acc0});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update phone (id)", async () => {
        newPhone = Buffer.from("7971F5843BB00D0F8C94799EE771471011", "hex")
        id = 11
        try {
            var tx = await pm.updatePhone(id, newPhone);
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update BankInformation", async () => {
        newBankInformation = Buffer.from("7971F5843BB00D0F8C94799EE771471012", "hex")
        id = 1
        try {
            var tx = await pm.updateBankInformation(id, newBankInformation, {from: acc1});
        }catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update BankInformation(id)", async () => {
        newBankInformation = Buffer.from("7971F5843BB00D0F8C94799EE771471012", "hex")
        id = 11
        try {
            var tx = await pm.updateBankInformation(id, newBankInformation, {from: acc0});
        }catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update Allergies", async () => {
        newAllergies = Buffer.from("7971F5843BB00D0F8C94799EE771471013", "hex")
        id = 1
        try {
            var tx = await pm.updateAllergies(id, newAllergies, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update Allergies(id)", async () => {
        newAllergies = Buffer.from("7971F5843BB00D0F8C94799EE771471013", "hex")
        id = 11
        try {
            var tx = await pm.updateAllergies(id, newAllergies, {from: acc0});
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update PensionCardNumber", async () => {
        newPensionCardNumber = Buffer.from("7971F5843BB00D0F8C94799EE771471014", "hex")
        id = 1
        try {
            var tx = await pm.updatePensionCardNumber(id, newPensionCardNumber, {from: acc1});
        }catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update PensionCardNumber (id)", async () => {
        newPensionCardNumber = Buffer.from("7971F5843BB00D0F8C94799EE771471014", "hex")
        id = 11
        try {
            var tx = await pm.updatePensionCardNumber(id, newPensionCardNumber, {from: acc0});
        }catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update MedicareNumber", async () => {
        newMedicareNumber = Buffer.from("7971F5843BB00D0F8C94799EE771471015", "hex")
        id = 1
        try {
            var tx = await pm.updateMedicareNumber(id, newMedicareNumber, {from: acc1});
        }catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update MedicareNumber (id)", async () => {
        newMedicareNumber = Buffer.from("7971F5843BB00D0F8C94799EE771471015", "hex")
        id = 11
        try {
            var tx = await pm.updateMedicareNumber(id, newMedicareNumber, {from: acc0});
        }catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update Nationality", async () => {
        newNationality = Buffer.from("7971F5843BB00D0F8C94799EE771471016", "hex")
        id = 1

        try {
            var tx = await pm.updateNationality(id, newNationality, {from: acc1});
        }catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update Nationality (id)", async () => {
        newNationality = Buffer.from("7971F5843BB00D0F8C94799EE771471016", "hex")
        id = 11

        try {
            var tx = await pm.updateNationality(id, newNationality, {from: acc0});
        }catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should not succeed to update MaritalStatus", async () => {
        newMaritalStatus = Buffer.from("7971F5843BB00D0F8C94799EE771471017", "hex")
        id = 1
        try {
            var tx = await pm.updateMaritalStatus(id, newMaritalStatus, {from: acc1});
        } catch(err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })
    it("Should not succeed to update MaritalStatus (id)", async () => {
        newMaritalStatus = Buffer.from("7971F5843BB00D0F8C94799EE771471017", "hex")
        id = 11
        try {
            var tx = await pm.updateMaritalStatus(id, newMaritalStatus, {from: acc0});
        } catch(err) {
            var msg = "Invalid id"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

});