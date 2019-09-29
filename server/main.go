package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// Location of a member
type Location struct {
	Name string `json:"name"`
	Lat  string `json:"lat"`
	Lng  string `json:"lng"`
}

func main() {
	e := echo.New()
	e.Use(middleware.CORS())

	e.GET("/", func(c echo.Context) error {
		data := getData()
		return c.JSON(http.StatusOK, data)
	})

	e.GET("/update", func(c echo.Context) error {
		name := c.QueryParam("name")
		lat := c.QueryParam("lat")
		lng := c.QueryParam("lng")

		location := &Location{
			Name: name,
			Lat:  lat,
			Lng:  lng,
		}

		if !addOrUpdateData(location) {
			return c.NoContent(http.StatusBadRequest)
		}

		return c.NoContent(http.StatusOK)
	})

	e.Logger.Fatal(e.StartTLS(":3000", "../cert.pem", "../key.pem"))
}
