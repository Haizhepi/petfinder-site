package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;

@RestController
@RequestMapping(value = "/api/reset")
public class PasswordResetEndpoint {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/securityAnswer")
    public String authSecurityAnswer(@RequestBody UserDto userDto) {
        System.out.println("Getting Security Answer");
        UserDto user = userService.findUserByPrincipal(userDto.getPrincipal()).get();
        if(user != null){
            System.out.println(user.getPrincipal());
            System.out.println(user.getSecurityAnswer());
            return user.getSecurityAnswer();
        }
        return null;
    }


}
