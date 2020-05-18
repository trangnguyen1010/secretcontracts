const PatientManagement = artifacts.require("PatientManagement");

contract('Patient management', async (accounts) => {
    var pm;
    var owner = accounts[0]
    var acc0 = accounts[0]
    var acc1 = accounts[1]
    before(async () => {
        pm = await PatientManagement.new();
    });

    it("Should succeed to change owner", async () => {
        var newOwner = acc1
        pm.changeOwner(newOwner)
        var cOwner = await pm.owner.call()
        assert.equal(cOwner, newOwner, "Owner is diff")
    })

    it("Should not succeed to change owner if sender is not the owner", async () => {
        var newOwner = acc1
        try {
            var t = await pm.changeOwner(newOwner)
        } catch (err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should succeed to change owner 2", async () => {
        await pm.changeOwner(acc0, { from: acc1 })
        var cOwner = await pm.owner.call()
        assert.equal(cOwner, acc0, "Owner is diff")
    })

    it("Should not succeed to add new patient if sender is not the owner", async () => {
        name = "John Mc"
        dob = Math.floor(new Date("1990 March 22").getTime() / 1000)
        gender = 1; //1:Male, 2: Female, 3: Other
        homeAddress = "12L Green Boulevard";
        emailAddress = "job.mc@gmail.com";
        occupation = "architect";
        emergencyContact = "David Mc";
        try {
            var tx = await pm.addNewPatient(
                name,
                dob,
                homeAddress,
                emailAddress,
                gender,
                occupation,
                emergencyContact, { from: accounts[2] }
            )
        } catch (err) {
            var msg = "Not owner"
            assert.equal(msg, err.reason, "Msg is diff")
        }
    })

    it("Should succeed to add new patient", async () => {
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

    it("Should succeed to update name", async () => {
        newName = "David"
        id = 1

        var tx = await pm.updateName(id, newName);
        var name = await pm.getName(id)
        assert.equal(name, newName, "Name is diff")
    })

    it("Should succeed to update dob", async () => {
        newDOB = 999999
        id = 1

        var tx = await pm.updateDOB(id, newDOB);
        var dob = await pm.getDOB(id)
        assert.equal(dob, newDOB, "dob is diff")
    })

    it("Should succeed to update address", async () => {
        newAddress = "193 David"
        id = 1

        var tx = await pm.updateAddress(id, newAddress);
        var addr = await pm.getAddress(id)
        assert.equal(addr, newAddress, "Address is diff")
    })

    it("Should succeed to update email", async () => {
        newEmail = "david@hotmail.com"
        id = 1

        var tx = await pm.updateEmail(id, newEmail);
        var email = await pm.getEmail(id)
        assert.equal(email, newEmail, "email is diff")
    })

    it("Should succeed to update gender", async () => {
        newGender = 3
        id = 1

        var tx = await pm.updateGender(id, newGender);
        var gender = await pm.getGender(id)
        assert.equal(gender, newGender, "gender is diff")
    })

    it("Should succeed to update occupation", async () => {
        newOccupation = "New occupation"
        id = 1

        var tx = await pm.updateOccupation(id, newOccupation);
        var occupation = await pm.getOccupation(id)
        assert.equal(occupation, newOccupation, "occupation is diff")
    })

    it("Should succeed to update EmergencyContact", async () => {
        newContact = "New contact"
        id = 1

        var tx = await pm.updateEmergencyContact(id, newContact);
        var contact = await pm.getEmergencyContact(id)
        assert.equal(contact, newContact, "contact is diff")
    })

    /**
     * https://www.devglan.com/online-tools/aes-encryption-decryption
     * text = 1
     * mode = ECB
     * key size = 128
     * key = 1234567890123456
     * ouput = hex
     */
    it("Should succeed to update phone", async () => {
        newPhone = Buffer.from("7971F5843BB00D0F8C94799EE771471011", "hex")
        id = 1

        var tx = await pm.updatePhone(id, newPhone);
        var phone = await pm.getPhone(id)
        assert.equal(phone, '0x' + newPhone.toString('hex'), "phone is diff")
    })

    it("Should succeed to update BankInformation", async () => {
        newBankInformation = Buffer.from("7971F5843BB00D0F8C94799EE771471012", "hex")
        id = 1

        var tx = await pm.updateBankInformation(id, newBankInformation);
        var BankInformation = await pm.getBankInformation(id)
        assert.equal(BankInformation, '0x' + newBankInformation.toString('hex'), "creditCardNumber is diff")
    })
    it("Should succeed to update Allergies", async () => {
        newAllergies = Buffer.from("7971F5843BB00D0F8C94799EE771471013", "hex")
        id = 1

        var tx = await pm.updateAllergies(id, newAllergies);
        var Allergies = await pm.getAllergies(id)
        assert.equal(Allergies, '0x' + newAllergies.toString('hex'), "Allergies is diff")
    })

    it("Should succeed to update PensionCardNumber", async () => {
        newPensionCardNumber = Buffer.from("7971F5843BB00D0F8C94799EE771471014", "hex")
        id = 1

        var tx = await pm.updatePensionCardNumber(id, newPensionCardNumber);
        var PensionCardNumber = await pm.getPensionCardNumber(id)
        assert.equal(PensionCardNumber, '0x' + newPensionCardNumber.toString('hex'), "PensionCardNumber is diff")
    })

    it("Should succeed to update MedicareNumber", async () => {
        newMedicareNumber = Buffer.from("7971F5843BB00D0F8C94799EE771471015", "hex")
        id = 1

        var tx = await pm.updateMedicareNumber(id, newMedicareNumber);
        var MedicareNumber = await pm.getMedicareNumber(id)
        assert.equal(MedicareNumber, '0x' + newMedicareNumber.toString('hex'), "MedicareNumber is diff")
    })

    it("Should succeed to update Nationality", async () => {
        newNationality = Buffer.from("7971F5843BB00D0F8C94799EE771471016", "hex")
        id = 1

        var tx = await pm.updateNationality(id, newNationality);
        var Nationality = await pm.getNationality(id)
        assert.equal(Nationality, '0x' + newNationality.toString('hex'), "Nationality is diff")
    })

    it("Should succeed to update MaritalStatus", async () => {
        newMaritalStatus = Buffer.from("7971F5843BB00D0F8C94799EE771471017", "hex")
        id = 1

        var tx = await pm.updateMaritalStatus(id, newMaritalStatus);
        var MaritalStatus = await pm.getMaritalStatus(id)
        assert.equal(MaritalStatus, '0x' + newMaritalStatus.toString('hex'), "MaritalStatus is diff")
    })

});