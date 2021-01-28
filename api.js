const express = require("express");
const router = express.Router();

var transactions = [];
var useraccounts = {};
var totalpoints = 0;

function date_time(string){
    
    var strarr = string.split(" ")
    var mondate = strarr[0].split("/")
    var month1 = Number(mondate[0])
    var day1 = Number(mondate[1])
    var hour1 = 0;
    if (strarr[1].includes('AM')){
	    var strlen = strarr[1].length
	    if (strlen == 3){
    	    hour1 = Number(strarr[1].slice(0,1))
	    }
        else{
    	    hour1 = Number(strarr[1].slice(0,2))
        }
    }
    else{
	    var strlen = strarr[1].length
	    if (strlen == 3){
    	    hour1 = Number(strarr[1].slice(0,1))
            hour1+=12
	    }
        else{
    	    hour1 = Number(strarr[1].slice(0,2))
		    hour1+=12
        }
    }

    var d = new Date(2020, month1, day1, hour1);
    return d

    
    
}
exports.addpoints = async (req,res,next) => {

    /* This API is used to add points to the User account
       
       Returns:
        (JSON): Returns a JSON object with message stating points added successfully
    */

    if (req.body.payerName == null || req.body.payerName == undefined){res.status(400).json({'message':'payerName is missing'})}
    else{ var payer = req.body.payerName }

    if (req.body.points == null || req.body.points == undefined){res.status(400).json({'message':'points are missing'})}
    else{var points = req.body.points}

    if (req.body.transactionDate == null || req.body.transactionDate == undefined){res.status(400).json({'message':'transactionDate is missing'})}
    else{var tranDate = date_time(req.body.transactionDate)}

    if (points > 0){
        totalpoints+= points
        transactions.unshift([payer,points,tranDate])
        if (!(payer in useraccounts)){
             useraccounts[payer] = points
        }
        else{
            useraccounts[payer]+= points
        }
        res.status(200).json({'message':'Points Added Successfully!'})   
            
    }
    
    else if (points < 0){

        if ((payer in useraccounts) && (useraccounts[payer] - points) < 0){
            res.status(400).json({'message':'Invalid transaction record'})
        }
            
        else if ((payer in useraccounts) && (useraccounts[payer] - points) > 0){
            useraccounts[payer]+=points 
            totalpoints += points
            i = transactions.length - 1
            while (i >= 0){
                if (transactions[i][0] == payer){
                         remaining = transactions[i][1] + points
                         if (remaining <= 0) {
                                    transactions.splice(i,1)
                                    points = remaining
                          }
                          else{
                                    transactions[i][1] = remaining
                                    break
                          }
                }
                i=i-1
            }
                
            res.status(200).json({'message':'Points Added Successfully!'})   
                
            }
        
            
        else{
            res.status(400).json({'message':'Invalid transaction record'})
    
            }
      }
    //console.log(transactions)
    //res.status(200).json({'message':'Points Added Successfully!'})   
    }
        

exports.deletepoints = async (req,res,next) => {


    /* This API is used to deduct points from the User account
       
       Returns:
        (JSON): Returns a JSON object with list of [payer, points deducted] after deducting points from the user account as per requested constraints
    */

    if (req.params.points_to_deduct == null || req.params.points_to_deduct == undefined){res.status(400).json({'message':'points_to_deduct is missing'})}
    else { var points_to_deduct = req.params.points_to_deduct }

    if (totalpoints < points_to_deduct){
        res.status(400).json({'message':'Insufficient points value !!'})
    }
    else{
        var points_list = []
        while (points_to_deduct > 0){

            
            transaction = transactions.pop()
            points_to_deduct=points_to_deduct - transaction[1]
            console.log('points_to_deduct',points_to_deduct)
            if (points_to_deduct < 0){
                points_deducted = transaction[1] + points_to_deduct
                transaction[1]=points_deducted
                transactions.push(transaction)
            }
            else{
                points_deducted = transaction[1]
            }
            transaction[1] = points_deducted    
            transaction[2] = "now"
            points_list.push(transaction)
            useraccounts[transaction[0]]-= points_deducted
            totalpoints-= points_deducted
            
        }
    }
    
    points_list.forEach((elem) => {
        elem[1] = -elem[1]
    })
    
    res.status(200).send(points_list)
}


exports.balance = (req,res,next) => {
    /*
    This is a REST endpoint to return points balance of each user
    Returns:
        JSON object: Returns a JSON object of dictionary that provides the balance points of each payer
    */
    res.status(200).send(useraccounts)
}