package petfinder.site.common.user.sitter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.booking.BookingDao;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.user.UserAuthenticationDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;
import sun.security.pkcs.ParsingException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SitterService {
    @Autowired
    private SitterAvailabilityDao sitterAvailabilityDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BookingService bookingService;


    public List<SitterAndDate> getSitters(String bookingId) {
        BookingDto booking = bookingService.findBooking(bookingId).get();
        List<SitterAndDate> res = new ArrayList<>();
        List<SitterAvailabilityDto> avails = sitterAvailabilityDao.findAllAvailability();
        System.out.println("list size" + avails.size());

        for (SitterAvailabilityDto sitterAvailabilityDto : avails) {
            if (sitterAvailabilityDto.getStartDate() != null
                    && sitterAvailabilityDto.getEndDate() != null
                    && sitterAvailabilityDto.getStartTime() != null
                    && sitterAvailabilityDto.getEndTime() != null
                    && booking.getStartDate() != null
                    && booking.getEndDate() != null
                    && booking.getStartTime() != null
                    && booking.getEndTime() != null) {
                if (bookingService.evaluate(booking.getStartDate(), booking.getEndDate(),
                        sitterAvailabilityDto.getStartDate(), sitterAvailabilityDto.getEndDate(),
                        booking.getStartTime(), booking.getEndTime(),
                        sitterAvailabilityDto.getStartTime(), sitterAvailabilityDto.getEndTime()
                ) == 1) {
                    System.out.println("valid");
                    UserDto sitter = userDao.findUserByPrincipal(sitterAvailabilityDto.getPrincipal()).get().getUser();
                    res.add(new SitterAndDate(sitterAvailabilityDto, sitter));
                }
            }

        }
        return res;
    }

    public Optional<SitterAvailabilityDto> findAvailability(String id) {
        System.out.println("here"+id);
        return sitterAvailabilityDao.findAvailability(id);
    }

    public UserDto findUserInfo(String principle) {
        UserDto res = new UserDto("Empty user");
        Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principle);
        if (temp.isPresent()) {
            res = temp.get().getUser();
        }
        return res;
    }


    public SitterAvailabilityDto save(SitterAvailabilityDto sitterAvailabilityDto) {
        sitterAvailabilityDao.save(sitterAvailabilityDto);
        return sitterAvailabilityDto;
    }

    public SitterAvailabilityDto update(SitterAvailabilityDto sitterAvailabilityDto) {
        SitterAvailabilityDto temp = null;
        Optional<SitterAvailabilityDto> u = sitterAvailabilityDao.findAvailability(sitterAvailabilityDto.getPrincipal());
        if (u.isPresent()) {
            temp = u.get();
            temp.setAvailability(sitterAvailabilityDto.getAvailability());
            temp.setStartDate(sitterAvailabilityDto.getStartDate());
            temp.setEndDate(sitterAvailabilityDto.getEndDate());
            temp.setStartTime(sitterAvailabilityDto.getStartTime());
            temp.setEndTime(sitterAvailabilityDto.getEndTime());
            sitterAvailabilityDao.save(temp);
        }
        else {
            sitterAvailabilityDao.save(sitterAvailabilityDto);
        }
        return temp;
    }

}
