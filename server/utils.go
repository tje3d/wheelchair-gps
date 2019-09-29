package main

import (
	"encoding/json"
	"io/ioutil"
)

func getData() []Location {
	data, err := ioutil.ReadFile("data.json")

	if err != nil {
		return []Location{}
	}

	var output []Location
	err = json.Unmarshal(data, &output)

	return output
}

func addOrUpdateData(loc *Location) bool {
	locations := getData()
	found := false

	if loc.Name == "" || loc.Lat == "" || loc.Lng == "" {
		return false
	}

	for index, value := range locations {
		if value.Name == loc.Name {
			locations[index].Name = loc.Name
			locations[index].Lat = loc.Lat
			locations[index].Lng = loc.Lng
			found = true
		}
	}

	if !found {
		locations = append(locations, *loc)
	}

	data, _ := json.Marshal(locations)
	defer ioutil.WriteFile("data.json", data, 0777)

	return true
}
