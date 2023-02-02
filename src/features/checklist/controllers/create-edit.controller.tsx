import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import Checklist from '../../../database/models/checklist';
import {useChecklist} from '../contexts/checklist.context';

const useCreateEditController = (checklist: Checklist) => {
  const checklistContext = useChecklist();
  const navigation = useNavigation();

  const [type, setType] = useState(checklist.type ?? 'BPA');

  const [amountOfMilkProduced, setAmountOfMilkProduced] = useState(
    checklist.amountOfMilkProduced,
  );
  const [numberOfCowsHead, setNumberOfCowsHead] = useState(
    checklist.numberOfCowsHead,
  );
  const [hadSupervision, setHadSupervision] = useState(
    checklist.hadSupervision,
  );
  const [farmerName, setFarmerName] = useState(checklist.farmer?.name);
  const [farmerCity, setFarmerCity] = useState(checklist.farmer?.city);
  const [from, setFrom] = useState(checklist.from?.name);
  const [to, setTo] = useState(checklist.to?.name);
  const [latitude, setLatitude] = useState(checklist.location?.latitude);
  const [longitude, setLongitude] = useState(checklist.location?.longitude);

  const getChecklistInstance = () => {
    return Checklist.fromJSON({
      _id: checklist._id,
      id: checklist.id,
      type,
      amountOfMilkProduced: Number(amountOfMilkProduced),
      numberOfCowsHead: Number(numberOfCowsHead),
      hadSupervision,
      farmer: {name: farmerName, city: farmerCity},
      from: {name: from},
      to: {name: to},
      location: {latitude: Number(latitude), longitude: Number(longitude)},
      createdAt: checklist.createdAt,
      updatedAt: new Date(),
    });
  };
  const handleUpdateButton = async () => {
    Toast.show({text1: 'Updating...', type: 'info'});

    await checklistContext.update(getChecklistInstance());

    Toast.show({text1: 'Updated!', type: 'success'});
  };

  const handleDeleteButton = async () => {
    Toast.show({text1: 'Deleting...', type: 'info'});

    await checklistContext.destroy(getChecklistInstance());

    navigation.goBack();

    Toast.show({text1: 'Deleted!', type: 'success'});
  };

  const handleCreateButton = async () => {
    Toast.show({text1: 'Creating...', type: 'info'});

    await checklistContext.create(getChecklistInstance());

    navigation.goBack();

    Toast.show({text1: 'Created!', type: 'success'});
  };

  const handleGobackButton = async () => {
    navigation.goBack();
  };

  return {
    type,
    amountOfMilkProduced,
    numberOfCowsHead,
    hadSupervision,
    farmerName,
    farmerCity,
    from,
    to,
    latitude,
    longitude,
    setAmountOfMilkProduced,
    setType,
    setFarmerName,
    setHadSupervision,
    setFarmerCity,
    setFrom,
    setTo,
    setLatitude,
    setLongitude,
    setNumberOfCowsHead,
    handleUpdateButton,
    handleDeleteButton,
    handleCreateButton,
    handleGobackButton,
  };
};

export default useCreateEditController;
