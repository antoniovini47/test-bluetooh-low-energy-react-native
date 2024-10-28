import react from "react";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import styles from "../assets/styles/styles";
import { Collapsible } from "./Collapsible";

export const bleManager = new BleManager();

// Device Interface
// TODO: Identify the correct type for this
interface Device {
  id: string;
  name: string;
}

export default function MainPage() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  // Managers Central Mode
  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  function scanForPeripherals() {
    console.log("Scanning for peripherals...");
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
      }

      // TODO: Create a input to change this "dispositivo" for any other name, for filter the devices
      // TODO: if (device && (device.localName === "Dispositivo" || device.name === "Dispositivo")) {

      if (device) {
        //console.warn("Device found! Data: ", device.id, " - ", device.name);
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  }

  return (
    <View style={styles.containerMain}>
      <Text>Central Mode - Listing Devices</Text>
      <View style={styles.containerButtons}>
        <Button title="Start" onPress={scanForPeripherals} />
        {/* TODO: Implement this button
        <Button
          title="Stop"
          onPress={() => {
            console.log("Stop Scanning");
            bleManager.stopDeviceScan;
          }}
        /> */}
        <Button title="Clear" onPress={() => setAllDevices([])}></Button>
      </View>
      <Text>Devices</Text>
      <View style={styles.containerDevices}>
        {allDevices.map((device) => (
          <Text key={device.id}>
            📲 - {device.id} - {device.name}
          </Text>
        ))}
      </View>
    </View>
  );
}
