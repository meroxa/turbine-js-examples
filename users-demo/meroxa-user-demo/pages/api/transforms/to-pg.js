import axios from 'axios'

export default async function handle(req, res) {

    if (req.body.event_type === "survey_response.created") {

        const payload = {
            "id": parseInt(req.body.event_data.person_properties.meroxa_id),
            "platformId": req.body.event_data.person_properties.meroxa_id,
            "surveyType": req.body.event_data.survey_type,
            "score": parseInt(req.body.event_data.score),
            "comment": req.body.event_data.comment,
            "source": req.body.event_data.person_properties['Delighted Source'],
            "device": req.body.event_data.person_properties['Delighted Device Type'],
            "os": req.body.event_data.person_properties['Delighted Operating System'],
            "browser": req.body.event_data.person_properties['Delighted Browser'],
        }

        const dataRecord = {
            "schema": {
                "type": "struct",
                "fields": [
                    {
                        "type": "int32",
                        "optional": false,
                        "field": "id"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "surveyType"
                    },
                    {
                        "type": "int32",
                        "optional": true,
                        "field": "score"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "comment"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "source"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "device"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "os"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "browser"
                    },
                    {
                        "type": "string",
                        "optional": true,
                        "field": "platformId"
                    }
                ],
                "optional": false,
                "name": "Survey"
            },
            "payload": payload
        }

        console.log(dataRecord)

        res.status(200).json(dataRecord)

        try {
            const response = await axios.post(process.env.MEROXA_ENDPOINT,dataRecord);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    
    } else {
        res.json(200)
    }
}