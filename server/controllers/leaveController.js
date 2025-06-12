import Leave from '../models/leave.js'
import Employee from '../models/Employee.js'
import User from '../models/User.js'


const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason} = req.body
        const employee = await Employee.findOne({userId})

        const newLeave = new Leave({
           employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
        })
        await newLeave.save()

        return res.status(200).json({success: true})

    } catch(error) {
        console.log(error.message)
         return res.status(500).json({success: false, error: "leave add server error"})
    } 
}


const getLeave = async (req, res) => {
    try {
        const {id} = req.params;
        let leaves = await Leave.find({employeeId: id})
        if(!leaves || leaves.length === 0) {
            const employee = await Employee.findOne({userId: id})

            leaves = await Leave.find({employeeId: employee._id})
    
        }
        return res.status(200).json({success: true, leaves})
        
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave get server error"})
    } 
}

const getLeaves =  async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        });
        return res.status(200).json({success: true, leaves})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave get server error"})
    } 
}

const getLeaveDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        });
        return res.status(200).json({success: true, leave})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave get server error"})
    } 
}

const updateLeave = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(req.body.status)
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status })
        if(!leave){
            return res.status(404).json({success: false, error: "leave not founded"})
        }
        return res.status(200).json({success: true})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave update server error"})
    }
}

const sendLeave = async (req, res) => {
    try {
        const { id } = req.params;

        // Get employee record to find employeeId used in Leave
        const employeeRecord = await Employee.findOne({ userId: id });
        if (!employeeRecord) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        const employee = await User.findById(id);
        if (!employee || !employee.email) {
            return res.status(400).json({ success: false, error: "Employee email not found" });
        }

        const leaves = await Leave.find({ employeeId: employeeRecord._id });

        // Format email content
        const leaveDetails = leaves.map((leave, index) => (
            `${index + 1}. ${leave.leaveType} (${leave.startDate} to ${leave.endDate}) - ${leave.reason} [${leave.status}]`
        )).join('\n');

        // Send email
        await sendEmail({
            to: employee.email,
            subject: "Your Leave Records",
            text: `Here are your leave records:\n\n${leaveDetails}`,
        });

        res.json({ success: true, message: "Email sent successfully" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to send email" });
    }
};

export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave, sendLeave }