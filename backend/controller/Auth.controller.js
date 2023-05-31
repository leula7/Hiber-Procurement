import { Supplier, User} from '../model/Auth/Auth.model.js';
import  jwt  from "jsonwebtoken";
import path from "path";
import { expressjwt } from "express-jwt";
import md5 from "md5";

const secret =process.env.ACCESS_TOKEN_SECRET;
const protect= expressjwt({ secret: secret,algorithms: ['HS256'] });

    export const AuthLogin = async (req, res) => {
        try {
        const { username, position } = req.body;
        const password = md5(req.body.password);

        if (!username || !password || !position) {
            return res.json({
            "user": {},
            "error": "400",
            "message": "Empty credentials"
            });
        }
        
        let user;
        let includeBranch = false;

        if (position === 'concerned') {
            user = await User.findOne({
            attributes: ['user_id', 'position', 'branch_id', 'username'],
            where: {
                username,
                password,
                position
            }
            });
            
            includeBranch = true;
        } else if (position === 'supplier') {
            user = await Supplier.findOne({
            attributes: ['supplier_id', 'tin_number', 'username'],
            where: {
                username,
                password
            }
            });
        }else{
            user = await User.findOne({
            attributes: ['user_id', 'position', 'username'],
            where: {
                username,
                password
            }
            });
        }

        if (user) {
            const token = jwt.sign({
            user_id: user.user_id,
            username: user.username,
            position: user.position
            }, secret, { expiresIn: '1min', algorithm: 'HS256' });

            let branch = {};

            if (includeBranch) {
            branch = await Branch.findOne({
                attributes: ['branch_name', 'branch_id'],
                include: {
                model: User,
                attributes: [],
                where: {
                    user_id: user.user_id
                }
                }
            });
            }

            res.json({
                user_id: user.user_id,
                position: user.position,
                username: user.username,
                branch_name: branch.branch_name,
                Branch_id: branch.branch_id,
                position,
            "error": "200",
            "message": "Login Success",
            token
            });

            console.log("Login Success");
        } else {
            res.json({
            "error": "400",
            "message": "Login Error",
            });
        }
        } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            "error": "500",
            "message": "Internal Server Error"
        });
        }
    }

    export const AuthRegister = async (req, res) => {
        try {
        // Get input from user
        const fname = req.body.fname;
        const position = req.body.position;
        const lname = req.body.lname;
        const branch_id = req.body.branch_id;
        const username = req.body.username;
        const password = req.body.password;
        const tinnumber = req.body.tinnumber;
        const spec = req.body.spec;
        const hashedPassword = md5(password);
    
        let registerParams;
    
        if (position === 'supplier') {
            // Handle supplier registration logic if needed
        } else if (position === 'concerned_dep') {
            // Handle concerned_dep registration logic if needed
        } else {
            // Regular user registration
            registerParams = {
            fname,
            lname,
            position,
            branch_id,
            username,
            password: hashedPassword,
            };
    
            const newUser = await User.create(registerParams);
    
            if (newUser) {
            const userDir = path.join('uploads', username);
    
            if (position === 'supplier' || position === 'marketofficer') {
                if (fs.existsSync(userDir)) {
                console.log('Folder Already Exists');
                } else {
                fs.mkdir(userDir, (err) => {
                    if (err) {
                    console.error('Error While Creating Folder', err);
                    res.json({
                        error: '500',
                        message: 'Internal Server Error',
                    });
                    } else {
                    console.log('Folder Created Successfully');
                    res.status(200).json({
                        error: '200',
                        message: 'Registration Successful',
                    });
                    }
                });
                }
            } else {
                res.status(200).json({
                error: '200',
                message: 'Registration Successful',
                });
            }
            }
        }
        } catch (err) {
        console.log(err);
        res.status(200).json({
            error: '400',
            message: err.message,
        });
        }
    }