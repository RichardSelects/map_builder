<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
  <meta name="viewport" content="user-scalable=no, width=device-width,
      initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5" />

  <title>Map Builder</title>

  <!-- CSS -->
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
  <link rel="stylesheet" href="master.css" type="text/css" media="screen" title="no title" charset="utf-8">

<?php
  $pages = array();
  $files = glob("tiles/*/*");
  foreach ($files as $file)
  {
    $parts = explode("/", $file);
    $pages[$parts[1]][] = array(
      "path" => $file,
      "name" => ucwords(str_replace("-", " ", substr($parts[2], 0, -4))),
      "overlay" => ($parts[1] == "walls" || $parts[1] == "misc") ? "true" : "false" ,
    );
  }
?>

</head>
	<body>
		
    <div class="container-fluid">
      <div class="row">
        <div id="canvas" class="col-sm-9">
          <?php
            for ($r = 1; $r < 11; $r++)
            {
              echo "<div class='row'>";
              for ($c = 1; $c < 11; $c++)
              {
                echo "<div class='tile'></div>";
              }
              echo "</div>";
            }
          ?>
        </div>

        <div class="col-sm-2">
          
          <div id="tools" class="form-group">
            <div class="btn-group">
              <button class="btn btn-default active">Paint</button>
              <button class="btn btn-default">Erase</button>
            </div>
          </div>

          <div id="palette" class="form-group">
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
              <?php foreach ($pages as $page => $tiles): ?>
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="<?php echo $page; ?>-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#<?php echo $page; ?>" aria-expanded="<?php echo ($page == 'ground') ? 'true' : 'false' ; ?>" aria-controls="<?php echo $page; ?>">
                      <?php echo ucwords($page); ?>
                    </a>
                  </h4>
                </div>
                <div id="<?php echo $page; ?>" class="panel-collapse collapse <?php echo ($page == 'ground') ? 'in' : '' ; ?>" role="tabpanel" aria-labelledby="<?php echo $page; ?>">
                  <div class="panel-body">
                    <?php
                      foreach ($tiles as $tile)
                      {
                        echo "<img class='tile palette' data-overlay='{$tile['overlay']}' src='{$tile['path']}'>";
                      }
                    ?>
                  </div>
                </div>
              </div>
              <?php endforeach; ?>
            </div>
          </div>

        </div>

      </div>
    </div>

  <!-- Javascript -->
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
  <script type="text/javascript" src="master.js"></script>

	</body>
</html>
