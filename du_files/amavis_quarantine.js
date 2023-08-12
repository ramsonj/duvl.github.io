function rcmail_get(props, obj, evt)
{
  rcmail_release(obj, false);
  return false;
}

function rcmail_send(props, obj, evt)
{
  rcmail_release(obj, true);
  return false;
}

function rcmail_release(obj, send)
{
  var tr = $(obj).parents('tr')
  var mid = tr.data('mid');
  var sid = tr.data('sid');

  var vars = { mid: mid, sid: sid };
  if (send) {
    var user = tr.data('user');
    vars['user'] = user;
  }
  rcmail.http_post('release', vars, false);
}

function quarantine_released(data)
{
  $('tr[data-mid='+data.mid+']').addClass('released');
  rcmail.display_message(data.msg);
  return false;
}

if (window.rcmail) {
  rcmail.addEventListener('init', function(evt) {
    rcmail.register_command('plugin.get', rcmail_get, true);
    rcmail.register_command('plugin.send', rcmail_send, true);

    rcmail.addEventListener('plugin.released', quarantine_released);

    $('#messagelist .message')
      .bind('mouseover', function(){
         $(this).addClass('hover');
      })
      .bind('mouseout', function(){
         $(this).removeClass('hover');
      });
  });
}
