const userModel = require("../../models/userModel")

async function allUsers(req,res){
    try{
        console.log("userid all Users",req.userId)

        const allUsers = await userModel.find()
        
        res.json({
            message : "All User ",
            data : allUsers,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allUsers                                                  


  // bcnvnvdnnfnnnnfdjoiaidijddj jnd  jndjsnds djsndjnjsaoI  isdijdOA0  IDISDAO OAIASDJSI ISDSIDS  JIJVSOVV SIJSIJ SJDSDS EREOIEO SDAOI0 JSDDIW SJDSU RTRMML,ASA LKPM, DSDSLDM PPO SMDLAP ;PQWQ LXCKLz LKASK MNVBNVM YERP AJIOAj pohkfgok hsvdFAC FMGDJKSO VSfgc klmgklsdm ghvjz c kdfgklsdmn jkzxbnhB kxmng gasvav mhkghgk zxcvzgvx mkgfkmglf bvcsbc kmfgmfk vkldfgm hdsbhy kdfjdn fnjkdni fglkjkf vcjjk s sdrdof dkmfgmdm flgkbfo vlkmlckm colkgmd cvbkmck dofgkmod fmvgodf dfogkmdfo fgjkmnfog fkogmfkng fkjmgfkmd mlfkmbgdfklb glbmcklbm bcklmbklco kbmnklvpf kdpasopp dsppsfpsdkf kfgdopfm kgmfgk xdokfgpos fiogmpfiog vpokgd dpkmfgsd pfgdfpsd dpfgpsdf fpogmdfgm fgpogopdfg fgiopdsfgsp sdopfpdfpsdof gmdsifsiopd fgmspdomfgp vmbpmgbp fpogporfg dfopgkdfopg fpgdopfgk dfgfpdogp fpgfpog gpohfpodgp hpdfghpdfp dpfogh hkdfgm fgmfpgm hmfg dfgmfdgmmgpfdmgpd mhdfpgpd w[erow w[oeow eowp[-rkw [p\ d;fg xsscxv dfgdz  dfz   zcv ,,ll;l l; llkkp kkk gfgfg gdg gdfgd gdgdg sasadas rtrr yt                                                                                                                                                                                                                                  dp[ \,d[fd[ p[df[df[;f d[]\dl;kd\d]\bm[lmgl[mgdlm][mfgdlm,][mdfmd]fdmfdm]gkfgdop]]]]]]]]]