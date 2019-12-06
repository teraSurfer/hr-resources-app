/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const Sequelize = require('sequelize');
const sequelize = new Sequelize("salaries", "postgres", process.env.PSWD, {
  host: process.env.HOST,
  dialect: 'postgres'
});
const SalariesModel = require('./models/salaries.model')(sequelize, Sequelize);

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.use(function(req, res, next) {
  SalariesModel.sync().then(() => {
    return next();
  }).catch(err => {
    res.statusCode(500);
    return res.json(err);
  })
})


/**********************
 * Example get method *
 **********************/

app.get('/salaries/count', function (req, res) {
  // Add your code here
  SalariesModel.count({}, {
    where: {
      createdAt: {
        [Sequelize.Op.gt]: new Date('01/11/2019')
      }
    }
  }).then((c) => {
    return res.status(200).json({ count: c });
  }).catch(err => {
    return res.status(500).json({ error: err });
  })
});

app.get('/salaries/all', function (req, res) {
  // Add your code here
  SalariesModel.count().then((c) => {
    return res.status(200).json({ count: c });
  }).catch(err => {
    return res.status(500).json({ error: err });
  })
});

app.get('/salaries', function (req, res) {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  SalariesModel.findAll({
    limit: limit,
    offset: offset
  }).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json({error: err})
  })
})

app.get('/salaries/:id', function(req, res) {
  SalariesModel.findByPk(req.params.id).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json({error:err})
  })
})

app.patch('/salaries/:id', function(req, res) {
  SalariesModel.update({
    employee_id: req.body.employee_id,
    salary: req.body.salary,
    from_date: req.body.from_date,
    to_date: req.body.to_date
  }, {
    where: {
      id: {
        [Sequelize.Op.eq]: req.params.id
      }
    }
  }).then(data => {
    res.status(200).json({
      data: data
    })
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

app.delete('/salaries/:id', function(req, res) {
  SalariesModel.destroy({}, {
    where: {
      id: {
        [Sequelize.Op.eq]: req.params.id
      }
    }
  }).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json({error: err})
  })
})

app.post('/salaries', function(req, res) {
  SalariesModel.create({
    ...req.body
  }).then(sal => {
    res.status(200).json({data: sal});
  }).catch(err => {
    res.status(500).json({error: err});
  })  
})


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
