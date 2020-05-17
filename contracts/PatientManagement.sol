pragma solidity ^0.6.0;

contract PatientManagement {
    address public owner;
    Patient[] patients;
    struct Patient {
        string name;
        uint256 dob; // timestamp
        uint256 gender; //1:Male, 2: Female, 3: Other
        string homeAddress;
        string emailAddress;
        string occupation;
        string emergencyContact;
        bytes welfareNumber;
        bytes phone;
        bytes creditCardNumber;
        bytes bankInformation;
        bytes allergies;
        bytes pensionCardNumber;
        bytes medicareNumber;
        bytes nationality;
        bytes maritalStatus;//:Single, Married, Single Parents

    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier validId(uint256 id) {
        require(id > 0 && id < patients.length, "Invalid id");
        _;
    }
    modifier validGender(uint256 gender) {
        require(gender >= 1 && gender <= 3, "Invalid gender");
        _;
    }
    event NewPatient(uint256 id);
    event ChangeOwner(address _newOwner);

    constructor() public {
        owner = msg.sender;

        // Add a fake info to make patient id always start from 1
        Patient memory p;
        p.name = "";
        patients.push(p);
    }

    function changeOwner(address _newOwner) public onlyOwner() {
        owner = _newOwner;
        emit ChangeOwner(owner);
    }

    /**
     * Add new patient with given public information
     */
    function addNewPatient(
        string memory _name,
        uint256 _dob,
        string memory _address,
        string memory _email,
        uint256 _gender, //1:Male, 2: Female, 3: Other
        string memory _occupation,
        string memory _emergencyContact
    ) public validGender(_gender) onlyOwner() returns(uint256) {
        Patient memory p;
        p.name = _name;
        p.dob = _dob;
        p.homeAddress = _address;
        p.emailAddress = _email;
        p.gender = _gender;
        p.occupation = _occupation;
        p.emergencyContact = _emergencyContact;

        patients.push(p);
        uint256 id = patients.length - 1;
        emit NewPatient(id);
        return id;
    }

    function updateName(uint256 id, string memory _newName) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.name = _newName;
    }
    function getName(uint256 id) public validId(id) view returns (string memory) {
        return patients[id].name;
    }

    function updateDOB(uint256 id, uint256 _newDOB) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.dob = _newDOB;
    }
    function getDOB(uint256 id) public validId(id) view returns (uint256) {
        return patients[id].dob;
    }

    function updateAddress(uint256 id, string memory _newAddress) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.homeAddress = _newAddress;
    }
    function getAddress(uint256 id) public validId(id) view returns (string memory) {
        return patients[id].homeAddress;
    }

    function updateEmail(uint256 id, string memory _newEmail) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.emailAddress = _newEmail;
    }
    function getEmail(uint256 id) public validId(id) view returns (string memory) {
        return patients[id].emailAddress;
    }

    function updateGender(uint256 id, uint256 _newGender) public onlyOwner() validId(id) validGender(_newGender) {
        Patient storage p = patients[id];
        p.gender = _newGender;
    }
    function getGender(uint256 id) public validId(id) view returns (uint256) {
        return patients[id].gender;
    }

    function updateOccupation(uint256 id, string memory _newOccupation) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.occupation = _newOccupation;
    }
    function getOccupation(uint256 id) public validId(id) view returns (string memory) {
        return patients[id].occupation;
    }

    function updateEmergencyContact(uint256 id, string memory _newEmergencyContact) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.emergencyContact = _newEmergencyContact;
    }
    function getEmergencyContact(uint256 id) public validId(id) view returns (string memory) {
        return patients[id].emergencyContact;
    }

    // Encrypted data get/set functions
    function updatePhone(uint256 id, bytes memory _newPhone) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.phone = _newPhone;
    }
    function getPhone(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].phone;
    }

    function updateCreditCardNumber(uint256 id, bytes memory _creditCardNumber) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.creditCardNumber = _creditCardNumber;
    }
    function getCreditCardNumber(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].creditCardNumber;
    }

    function updateBankInformation(uint256 id, bytes memory _bankInformation) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.bankInformation = _bankInformation;
    }
    function getBankInformation(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].bankInformation;
    }

    function updateAllergies(uint256 id, bytes memory _allergies) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.allergies = _allergies;
    }
    function getAllergies(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].allergies;
    }

    function updatePensionCardNumber(uint256 id, bytes memory _pensionCardNumber) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.pensionCardNumber = _pensionCardNumber;
    }
    function getPensionCardNumber(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].pensionCardNumber;
    }

    function updateMedicareNumber(uint256 id, bytes memory _medicareNumber) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.medicareNumber = _medicareNumber;
    }
    function getMedicareNumber(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].medicareNumber;
    }

    function updateNationality(uint256 id, bytes memory _nationality) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.nationality = _nationality;
    }
    function getNationality(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].nationality;
    }

    function updateMaritalStatus(uint256 id, bytes memory _maritalStatus) public onlyOwner() validId(id) {
        Patient storage p = patients[id];
        p.maritalStatus = _maritalStatus;
    }
    function getMaritalStatus(uint256 id) public validId(id) view returns (bytes memory) {
        return patients[id].maritalStatus;
    }

}
