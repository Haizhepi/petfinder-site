package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.sitter.SitterAndDate;
import petfinder.site.common.user.sitter.SitterAvailabilityDto;
import petfinder.site.common.user.sitter.SitterService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sitters")
public class SitterEndpoint {

    @Autowired
    private SitterService sitterService;
    private SitterAvailabilityDto sitterAvailabilityDto;

    // Take an id, and look up the corresponding pet
    @GetMapping(value = "/{id:.+}", produces = "application/json")
    public Optional<SitterAvailabilityDto> getAvailability(@PathVariable("id") String id) {
        System.out.println(id);
        return sitterService.findAvailability(id);
    }

    @GetMapping(value = "/info{id:.+}", produces = "application/json")
    public UserDto getInfo(@PathVariable("id") String id) {
        System.out.println(id);
        return sitterService.findUserInfo(id);
    }
    @GetMapping(value = "/sitterBookings", produces = "application/json")
    public List<BookingDto> sitterBookings() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return sitterService.sitterBookings(principal);
    }
    // Take a JSON representation of a Pet and save it to Elasticsearch
    @PostMapping(value = "")
    public SitterAvailabilityDto saveAvailability(@RequestBody SitterAvailabilityDto sitterAvailabilityDto) {
        System.out.println(sitterAvailabilityDto.getPrincipal());
        System.out.println(sitterAvailabilityDto.getAvailability());
        sitterService.update(sitterAvailabilityDto);
        return sitterAvailabilityDto;
    }


    @PostMapping(value = "/edit_availability")
    public SitterAvailabilityDto editProfile(@RequestBody SitterAvailabilityDto sitterAvailabilityDto) {
        System.out.println("updating" + sitterAvailabilityDto.getPrincipal());
        return sitterService.update(sitterAvailabilityDto);
    }

    @GetMapping(value = "/available{id}", produces = "application/json")
    public List<SitterAndDate> getAvailableSitter(@PathVariable("id") String id) {
        return sitterService.getSitters(id);
    }

    @GetMapping(value = "/invitations", produces = "application/json")
    public List<BookingDto> getInvitations() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return sitterService.getInvitations(principal);
    }



}
