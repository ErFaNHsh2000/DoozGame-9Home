$(function () {
  var firstperson = true, gamestarted=false, kindofgame="", last=0;

  const win_conditions = [[0,1,2,false],[3,4,5,false],[6,7,8,false],[0,3,6,false],[1,4,7,false],[2,5,8,false],[0,4,8,false],[2,4,6,false]];
  var xhomes = [],chomes = [];


  function startpage(){
    let savedcondition = localStorage.getItem("ConditionOfGame");
    if(savedcondition != ""){
      kindofgame = savedcondition;
      gamestarted = true;
      $("#collapseExample").removeClass("show");
      $("#collapseExample button").attr("data-bs-toggle","offcanvas");
      $("#collapseExample button").attr("data-bs-target","#offcanvasExample");

      startgame();
    }

    $("#singlegame").click(function () { 
      if(!gamestarted){
        gamestarted = true;
        kindofgame = "singlegame";
        $("#collapseExample").removeClass("show");
        $("#collapseExample button").attr("data-bs-toggle","offcanvas");
        $("#collapseExample button").attr("data-bs-target","#offcanvasExample");

        startgame();
      }else{
        localStorage.setItem('ConditionOfGame', "singlegame");
      }
    });
  
    $("#twogame").click(function () { 
      if(!gamestarted){
        gamestarted = true;
        kindofgame = "twogame";
        $("#collapseExample").removeClass("show");
        $("#collapseExample button").attr("data-bs-toggle","offcanvas");
        $("#collapseExample button").attr("data-bs-target","#offcanvasExample");

        startgame();
      }else{
        localStorage.setItem('ConditionOfGame', "twogame");
      }
    });
  
    $("#yesbtn").click(()=>{
      window.location.reload();
    })

    $("#nobtn").click(()=>{
      $(".offcanvas").removeClass("show");
    })
  }

  function setbg(){
    const widthwindow = window.innerWidth;
    if(widthwindow>992){
        $("body").css({"background-image":`url("./image/bg-lg.jpg")`});
    }
    if(widthwindow<992){
        $("body").css({"background-image":`url("./image/bg-sm.jpg")`});
    }
  }

  function checkdooz(){
    for (const key in win_conditions) {
      for(let x=0;x<5;x++){
        for(let y=x+1;y<5;y++){
            for(let z=y+1;z<5;z++){
              if(xhomes[x]==win_conditions[key][0] && xhomes[y]==win_conditions[key][1] && xhomes[z]==win_conditions[key][2] && win_conditions[key][3]==false){
                let a = $("#x-goalscore").html();
                a++;
                $("#x-goalscore").html(a);
                win_conditions[key][3]=true;
              }
              if(chomes[x]==win_conditions[key][0] && chomes[y]==win_conditions[key][1] && chomes[z]==win_conditions[key][2] && win_conditions[key][3]==false){
                let a = $("#c-goalscore").html();
                a++;
                $("#c-goalscore").html(a);
                win_conditions[key][3]=true;
              }
            }
          }
        }
    }
  }

  function checkwinner(){
    let first = $('#x-goalscore').html(), second = $('#c-goalscore').html();
    if(first>second){
      $(".SeccessBox").prepend("X player is winner")
      $(".MessageBox").addClass('active')
    }
    if(first<second){
      $(".SeccessBox").prepend("O player is winner")
      $(".MessageBox").addClass('active')
    }
    if(first==second){
      $(".SeccessBox").prepend("Game is equal")
      $(".MessageBox").addClass('active')
    }
    localStorage.setItem('ConditionOfGame', "");
    setTimeout(()=>{window.location.reload();},3000)
    
  }

  function startgame(){
    if(kindofgame == "singlegame"){
      let randomhome = [0,1,2,3,4,5,6,7,8];

      $("#input-group-btn button").click(function (e) {
        if(firstperson && $(e.target).attr('id')=="enabled"){
          $(e.target).css({"background-image":`url("./image/x-bg2.png")`});
          $(e.target).attr('id','disabled');
          let homenumber = $(e.target).toArray();
          homenumber = homenumber[0].classList[0].slice(12,13);
          xhomes.push(homenumber);
          xhomes.sort();
          let s1 = randomhome.indexOf(parseInt(homenumber));
          randomhome[s1]=-1;
          firstperson = false;
          
          if(last < 4){
            while(!firstperson){
              let randomnumber = Math.floor(Math.random() * 10);
              if(randomhome.includes(randomnumber)){
                let s2 = randomhome.indexOf(parseInt(randomnumber));
                randomhome[s2]=-1;
                let secondmove = $("#input-group-btn button");
                secondmove = secondmove[randomnumber].classList[0];
                let AddToChomes = secondmove.slice(12,13);
                $(`.${secondmove}`).css({"background-image":`url("./image/c-bg2.png")`});
                $(`.${secondmove}`).attr('id','disabled');
                chomes.push(AddToChomes);
                chomes.sort();
                firstperson = true;
                last++;
              }
            }
          }else{
            setTimeout(()=>{checkwinner();},500)
          }
          
          checkdooz();
        }
      })
    }

    if(kindofgame == "twogame"){
      $("#input-group-btn button").click(function (e) { 
        if(firstperson && $(e.target).attr('id')=="enabled"){
          $(e.target).css({"background-image":`url("./image/x-bg2.png")`});
          $(e.target).attr('id','disabled');
          let homenumber = $(e.target).toArray();
          homenumber = homenumber[0].classList[0].slice(12,13);
          xhomes.push(homenumber);
          xhomes.sort();
          firstperson = false;
          last++;
        }
        if(!firstperson && $(e.target).attr('id')=="enabled"){
          $(e.target).css({"background-image":`url("./image/c-bg2.png")`});
          $(e.target).attr('id','disabled');
          let homenumber = $(e.target).toArray();
          homenumber = homenumber[0].classList[0].slice(12,13);
          chomes.push(homenumber);
          chomes.sort();
          firstperson = true;
        }

        checkdooz();
        if(last>4){
          setTimeout(()=>{checkwinner();},100)
        }
      });
      


    }

  }


  setbg();
  startpage();

})
